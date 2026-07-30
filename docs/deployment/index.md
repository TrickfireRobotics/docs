---
title: Deployment Overview
---

This section is for server administrators setting up or maintaining the docs infrastructure. Member developers don't need any of this.

## What needs to be set up once

| Component                         | Guide                                    |
| --------------------------------- | ---------------------------------------- |
| Debian server with nginx          | [Server Setup](./server-setup)           |
| Cloudflare tunnel                 | [Cloudflare Tunnel](./cloudflare-tunnel) |
| GitHub Actions self-hosted runner | [Below](#github-runner)                  |     |

## Infrastructure at a glance

- **Server:** Debian, any cloud provider or on-prem
- **Docs directory:** `/home/trickfire/docs/` (the cloned repo)
- **Web server:** nginx on `localhost:80`, not exposed to the internet
- **Public access:** Cloudflare tunnel → `docs.trickfirerobotics.com`
- **CI runner:** GitHub Actions self-hosted, label `docs`, runs on the same machine

## Setup order

1. **Server Setup** — provision the server, clone the repo, install dependencies, set up nginx
2. **Cloudflare Tunnel** — install `cloudflared`, create tunnel, point DNS
3. **GitHub Actions Runner** — register the runner so CI jobs can run on this machine

After those three steps, pushing docs to any connected member repo will automatically update the live site.

## Ongoing maintenance

| Task                | How                                                       |
| ------------------- | --------------------------------------------------------- |
| Update framework    | Push to `main` in this repo — `deploy.yml` handles it     |
| Add a new project   | Member dev runs `trickfire-docs init` and pushes          |
| Remove a project    | Delete `/home/trickfire/docs/content/<repo>` and rebuild  |
| Rebuild manually    | `ssh server 'bash /home/trickfire/docs/scripts/build.sh'` |
| Check runner status | GitHub → Settings → Actions → Runners                     |

## GitHub Runner

A self-hosted GitHub Actions runner on the docs server processes both the `sync-docs` reusable workflow (called by member repos) and the `deploy` workflow (triggered by changes to this repo). The runner needs the label `docs` so the workflow `runs-on: [self-hosted, docs]` target resolves correctly.

### Register the runner

Go to the TrickFire Robotics organisation → **Settings → Actions → Runners → New self-hosted runner**, select the server's CPU architecture, and follow the commands shown. When prompted for labels, add `docs` (keep `self-hosted` too).

```bash
mkdir -p ~/docs-runner && cd ~/docs
# paste the download + configure commands from GitHub
# when asked for labels:
# Enter any additional labels: docs
```

### Install as a systemd service

```bash
sudo ./svc.sh install
sudo ./svc.sh start
sudo systemctl status actions.runner.*
```
