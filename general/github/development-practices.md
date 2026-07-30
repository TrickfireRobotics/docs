---
title: Development Practices
description: Branch naming and commit message conventions
---

Conventions we prefer to standardize on: branch naming, commit naming, and when to push.

## Branch naming

Try to follow these standards - most are adapted from the `dashboard` repo.

| Type    | Pattern                     | Example              |
| ------- | --------------------------- | -------------------- |
| Feature | `feat/<short-description>`  | `feat/order-export`  |
| Bug fix | `fix/<short-description>`   | `fix/session-expiry` |
| Chore   | `chore/<short-description>` | `chore/update-deps`  |

This makes it clearer what's going on at a glance. Each branch should be scoped to one specific feature or purpose, and should be merged and deleted once that purpose is met.

## Commit messages

Follow these commit naming standards. They make it clearer what a commit actually does.

```
<type>: <short description>
```

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature or behaviour                        |
| `fix`      | Bug fix                                         |
| `chore`    | Maintenance, deps, config - no behaviour change |
| `docs`     | Documentation only                              |
| `style`    | Formatting, whitespace - no logic change        |
| `refactor` | Code restructure with no feature or fix         |
| `perf`     | Performance improvement                         |
| `ci`       | CI/CD changes                                   |
| `revert`   | Reverts a previous commit                       |
