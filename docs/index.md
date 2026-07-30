---
title: TrickFire Docs
---

TrickFire Docs is the unified documentation system for TrickFire Robotics. Every project repo publishes its docs here automatically without the need to set up a documentation framework in the repo. This unifies the system, making it so all of the logic for docs is controlled by one repo, and only the raw content like the markdown or assets live in the separate repos.

The site is located at **[docs.trickfirerobotics.com](https://docs.trickfirerobotics.com)**.

## How it works

Each TrickFire project repo contains a `docs/` folder and a `docs.config.json` file. When you push changes to `main`, a GitHub Actions workflow syncs those files to the docs server and rebuilds the site. The result shows up at `docs.trickfirerobotics.com/<repo-name>` within seconds.

## Quick navigation

| I want to…                          | Go to                                         |
| ----------------------------------- | --------------------------------------------- |
| Add docs to my project              | [Member Guide](./member-guide.md)             |
| Write markdown content              | [Writing Content](./writing-content.md)       |
| Configure the sidebar               | [Sidebar Configuration](./sidebar-config.md)  |
| See all config options              | [Configuration Reference](./configuration.md) |
| Set up the server                   | [Deployment](./deployment/index.md)           |
| Understand how it all fits together | [Architecture](./architecture.md)             |
