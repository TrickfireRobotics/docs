# Contributing

## Setup

```sh
pnpm install
```

Node 22 (see `.nvmrc`) and pnpm are required.

## Before you commit

```sh
pnpm check   # lint + format check + typecheck everything
pnpm test    # cli tests
```

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, etc.) - this is enforced by commitlint via a git hook, and it drives the cli's automated npm releases. A pre-commit hook also runs lint-staged automatically, so most formatting/lint issues get fixed for you on commit.

## Opening a PR

- Keep PRs focused on one concern - don't mix portal and cli changes unless they're genuinely related.
- Make sure `pnpm check` and `pnpm test` pass.
- Note in the PR description whether the change touches the portal, the cli, or both.
