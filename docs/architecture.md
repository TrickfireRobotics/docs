---
title: Architecture
---

## System overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Member repos (GitHub)                                          │
│                                                                 │
│  trickfire-can/          trickfire-gui/       ak-series-lib/    │
│  ├── docs/               ├── docs/            ├── docs/         │
│  ├── docs.config.json      ├── docs.config.json   └── docs.config.json│
│  └── .github/workflows/  └── .github/workflows/                 │
│      docs.yml (push)         docs.yml (push)                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │ GitHub Actions (reusable workflow)
                       │ workflow_call → sync-docs.yml
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  Debian server  /home/trickfire/docs/                            │
│                                                                 │
│  content/                    ← synced by member CIs            │
│  ├── trickfire-can/                                             │
│  │   ├── docs/                                                  │
│  │   └── docs.config.json                                         │
│  ├── trickfire-gui/                                             │
│  └── ak-series-lib/                                             │
│                                                                 │
│  out/                        ← output of `next build` (static) │
│  scripts/build.sh            ← git pull + pnpm install + build  │
│  scripts/generate-sources.mjs ← reads content/ dirs dynamically │
└──────────────────────┬──────────────────────────────────────────┘
                       │ nginx (localhost:80)
                       │
                  ┌────┴────┐
                  │cloudflared│  ← outbound tunnel, no open ports
                  └────┬────┘
                       │ Cloudflare network
                       ▼
              docs.trickfirerobotics.com
```

## Components

### trickfire-docs repo

This repository (`TrickfireRobotics/trickfire-docs`) serves two roles:

1. **npm package** — the `trickfire-docs` CLI consumed via `npx`. It provides `trickfire-docs init`, `trickfire-docs dev`, and `trickfire-docs build`. Member repos never install it as a dependency.
2. **Fumadocs site** — the actual docs website. A Next.js app at the repo root, whose `scripts/generate-sources.mjs` scans `content/` at build time and wires up one Fumadocs content source per repo before `next build` runs.

### Member repos

Any TrickFire project repo. After running `npx trickfire-docs init`, the repo contains:

- `docs/` — markdown files
- `docs.config.json` — project name, description, and optional sidebar
- `.github/workflows/docs.yml` — fires on push to `main`, calls the reusable sync workflow

Member repos need no npm dependencies for the docs tooling. `npx trickfire-docs` downloads and runs the CLI on demand. Member repos never need to update their CI workflow — all changes to the sync logic happen in `sync-docs.yml` inside this repo.

### Debian server

Hosts everything at `/home/trickfire/docs/`. The self-hosted Actions runner (label: `docs`) runs directly on this machine, giving sync jobs direct filesystem access without SSH transfers.

**Directory layout on server:**

```
/home/trickfire/docs/
├── content/              ← gitignored, populated by sync jobs
│   ├── .gitkeep
│   └── <repo-name>/
│       ├── docs/
│       └── docs.config.json
├── out/                  ← static export output, served by nginx
├── scripts/
│   ├── build.sh
│   └── generate-sources.mjs
├── src/, next.config.ts, package.json, …  ← from git
└── node_modules/
```

### GitHub Actions

Two workflow types:

| Workflow         | File                       | Trigger                         |
| ---------------- | -------------------------- | ------------------------------- |
| Member sync      | `sync-docs.yml` (reusable) | Called by each member repo's CI |
| Framework deploy | `deploy.yml`               | Push to `main` in this repo     |

Both workflows run on the `[self-hosted, docs]` runner and call `scripts/build.sh` at the end.

### Cloudflare tunnel

A `cloudflared` daemon on the server opens an outbound tunnel to Cloudflare's network. No inbound ports need to be opened in the server firewall. Cloudflare terminates TLS and proxies traffic to nginx on `localhost:80`.

## Data flow: doc update

1. Developer pushes changes to `docs/` in a member repo.
2. GitHub Actions triggers `docs.yml` in that repo.
3. `docs.yml` calls `sync-docs.yml@main` in this repo.
4. The self-hosted runner on the server runs:
    - `rsync docs/ /home/trickfire/docs/content/<repo>/`
    - `cp docs.config.json /home/trickfire/docs/content/<repo>/`
    - `bash /home/trickfire/docs/scripts/build.sh`
5. `build.sh` runs `git pull`, `pnpm install`, `pnpm site:build`.
6. `generate-sources.mjs` scans all dirs in `content/`, parses each `docs.config.json`, and generates one Fumadocs content source plus `meta.json` files per repo; `next build` then statically exports the whole site to `out/`.
7. nginx serves `out/` to incoming requests from the Cloudflare tunnel.

## Data flow: framework update

1. A change to the site itself (design system, layout, `src/`) is merged to `main`.
2. `deploy.yml` runs on the self-hosted runner.
3. `build.sh` pulls the latest framework code and rebuilds.
4. `content/` is untouched — it's gitignored and survives the pull.
