# TrickFire Docs Framework

A shared documentation system for TrickFire Robotics member repositories. Member repos add `trickfire-docs` as a dev dependency, run `trickfire-docs init` to get scaffolding, and write docs in their own `docs/` folder. A self-hosted server pulls from each repo and builds them into a single Fumadocs site at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com).

## Docs

Full documentation: **[docs.trickfirerobotics.com/trickfire-docs](https://docs.trickfirerobotics.com/trickfire-docs/)**

- [**Member guide**](docs/member-guide.md) - install, init, write content, and preview locally with `trickfire-docs dev`
- [**Architecture**](docs/architecture.md) - how the CLI, CI, and hosted site fit together
- [**Configuration reference**](docs/configuration.md) - all `docs.config.json` fields
- [**Writing content**](docs/writing-content.md) - frontmatter, links, code blocks, admonitions, tabs
- [**Deployment**](docs/deployment/index.md) - server setup, Cloudflare tunnel, GitHub Actions runner (admin)
