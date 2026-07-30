---
title: Repository Practices
description: Repo naming conventions and what makes a repo pleasant to develop in
---

Practices for the different aspects of a repo itself, separate from how you work within a branch.

## Repo naming

Repo names should be short and concise, and as close as possible to what the code inside actually contains. Try to keep names to 3 words or fewer. `ak_series` and `simulations` are good examples.

Repo names should also use lowercase letters — prefer `ak_series` over `AK_Series`.

## Repo UX

Developing in a repo should be as easy as possible. Aim for workflows that standardize language conventions, formatting, and styling.

The `dashboard` repo is a great example of good developer UX. While the codebase is quite large, there are a few practices worth highlighting.

### Contributing

The dashboard repo has an extensive guide covering contributing and writing code, including branch naming, commit naming, testing, and migrations. When writing code, follow the repo's `CONTRIBUTING.md` file, since different repos may have different practices — information about how to test and write code for that repo will usually be found there.

### Workflows

The repo has a number of workflows: obvious ones like linting and formatting, but also testing, deployment to our production server, and dependency updates. These make developing and deploying code easy and consistent — automate as much as you reasonably can.

```
├── dependabot.yml
├── pull_request_template.md
└── workflows
    ├── code-quality.yml
    ├── deploy-monitor.yml
    ├── deploy.yml
    ├── docs.yml
    └── tests.yml
```

### Documentation

Aim to document as much of the code you write as you can, especially where it touches the repo's tech stack. The dashboard and its server are incredibly well documented, from the code itself to styling, the database, the server, and the security measures in place. All up-to-date documentation is hosted on `docs.trickfirerobotics.com` under the repo's name, using our custom docs framework. See the [repository](https://github.com/TrickfireRobotics/docs) to learn more.
