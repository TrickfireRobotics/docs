---
title: TrickFire Docs
---

TrickFire Docs is the unified documentation system for TrickFire Robotics. Every project repo publishes its docs here automatically - no manual uploads, no separate doc sites to maintain.

The live site is at **[docs.trickfirerobotics.com](https://docs.trickfirerobotics.com)**.

## How it works

Each TrickFire project repo contains a `docs/` folder and a `docs.config.json` file. When you push changes to `main`, a GitHub Actions workflow syncs those files to the docs server and rebuilds the site. The result shows up at `docs.trickfirerobotics.com/<repo-name>` within a minute.

```
Your repo push → GitHub Actions → sync to server → site build → live site
```

## Quick navigation

| I want to…                          | Go to                                      |
| ----------------------------------- | ------------------------------------------ |
| Add docs to my project              | [Member Guide](./member-guide)             |
| Write markdown content              | [Writing Content](./writing-content)       |
| Configure the sidebar               | [Sidebar Configuration](./sidebar-config)  |
| See all config options              | [Configuration Reference](./configuration) |
| Set up the server                   | [Deployment](./deployment/)                |
| Understand how it all fits together | [Architecture](./architecture)             |
