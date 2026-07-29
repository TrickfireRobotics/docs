---
sidebar_position: 1
---

# General github practices

These are some general guidelines for the suggested github practices throughout the club. This document is going to cover things such as repo naming, branch naming, and commit naming just to name a few. If you are contributing software to this club you should aim to follow as many of these as possible.

# Pull requests and working in parallel

One of the biggest things we heard from people throughout the club was them not being sure on how to work in parallel on someone in a branch. Here is what we suggest for changes that are more than maybe a few lines that touch actual code. Lets say you are working on a branch title `feat/fix-the-rover` and there is active work, however your friend wants to work on a specific feature in that branch but not in main. branch off their branch by doing this.

```bash title="Terminal"
#Enter their branch
git switch feat/fix-the-rover
#branch off of their branch
git checkout -b feat/fix-the-rover-wheels
```

Then write your code and create a pull request from `feat/fix-the-rover-wheels` into `feat/fix-the-rover` through github.
This does a few things, one lets the person who the branch belongs to be able to see what specifically changed between the two, allow them to resolve the merges and keep what specifically they may want from their and yours as well. For changes that are much smaller this typically isnt necessary but if the code is going to change a sizeable chunk of code or touch multiple files it is typically best to make these changes in a seperate branch and then merge.

Lets say however, they recently pushed some new code that you might want to pull into your branch to develop with the newest version. Run the following.

```bash title="Terminal"
#Pull a single file
git checkout branch-name -- path/to/file.txt
#Pull a folder
git checkout branch-name -- path/to/folder/
#Pull multiple files/folders
git checkout branch-name -- file1.txt folder/ file2.txt
```

Then commit and push the changes to the branch you are working on.

# Development practices

This will touch a few things we prefer that we standardize, mainly commit naming, branch naming and when to push.

## Branch Naming

Try to follow these standards, most of these are ripped from the `dashboard` repo and you should aim to try to follow these standards.

| Type          | Pattern                     | Example              |
| ------------- | --------------------------- | -------------------- |
| Feature       | `feat/<short-description>`  | `feat/order-export`  |
| Bug fix       | `fix/<short-description>`   | `fix/session-expiry` |
| Chore / infra | `chore/<short-description>` | `chore/update-deps`  |

This makes it more clear on whats going on.

## Commit Messages

Follow these commit naming standards, it makes it more clear what you are doing.

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

# Repo Practices

This pertains to the different practices for repos.

## Repo naming

Repo naming should be short and concise, and as close to what the code inside the repo contains. Please try to avoid repo names over preferably 3 words. Something like `ak_series` or `simulations` are good examples of these naming schemes.

Another suggestion for repo naming is names should use lowercase letters. Something like `ak_series` is preferable over `AK_Series`.

## Repo UX

Developing in a repo should be as easy as possible. You should strive for workflows that standardize language standards, formatting, and styling.
A great example of a repo that has good developer UX is the dashboard repo, while the codebase is significantly large there are a few good things I'd like to point out.

### Contributing

The dashboard has an extensive guide on contributing and writing code as well as things such as branch naming, commit naming, and as well as testing and migrations. Make sure that when you are writing code to do your best to follow the `CONTRIBUTING.md` file inside of the repo since specific repos may have different practices, usually information about how to test and write code will always be found here.

### Workflows

There are a number of workflows in this repo, a few obvious things such as linting, styling formatting but other things as well such as testing, deployment onto our production server, and updating dependencies. These are a few things that make developing and deploying code really easy and consistent, where you can you should aim to automate as much as you can or are willing to challenge yourself with.

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

You should aim to document as much of the code you write as you can, especially when it pertains to the tech stack that the repo is using. The tech stack for the dashboard and its server is incredibly well documented, from the actual code to the styling database and even the server and the security measures put in place. All up to date documentation will be hosted on `docs.trickfirerobotics.com` and the repo name using our custom docs framework. Look at the [repository](https://github.com/TrickfireRobotics/docs) to learn more.

## Commit Rebasing

Rebasing means replaying a series of commits onto a different base commit. In an _interactive_ rebase you also get to rewrite that series as it is replayed, which lets you combine related commits, fix bad messages, or drop commits entirely. Combining several commits into one is called **squashing**, and it is the most common reason we reach for a rebase. Lets say I have some commits that are titled like so.

> [!NOTE]
> This is typically reserved for large branches with many commits that could be clarified

```bash title="Terminal"
git log --oneline
```

```text title="Terminal output"
b592d03 feat: finalized constant
1e8fa47 feat: changed constant once more since it was wrong
c03d5ea feat: changed constant again since it was wrong
7f2b91c feat: changed constant since it was wrong
a46c438 feat: added a constant needed for motors
3b44697 style: renamed enum for individual motors to better fit
```

These are kinda useless commit messages and can confuse anyone looking at the history. So what we do is called an interactive rebase.
If you only need to change the last N commits do this.

> [!WARNING]
> Rebasing rewrites history. The commits you rebase are replaced by **new commits with new hashes**. The originals are not deleted, but they are no longer on your branch.
> If someone branched off your branch, their work is now based on commits that are not in your history anymore. Nothing of theirs is destroyed, but they will get duplicated commits and messy conflicts the next time they merge.
> Reach out to anyone working off your branch and make sure they arent mid-change before proceeding.

### Rebasing a few commits

First, make sure your working tree is clean. Rebase refuses to start when you have uncommitted changes, and **staging them is not enough** — `git add` does not help here. Running `git status` needs to come back empty, so either commit your work or stash it.

```bash title="Terminal"
#Stash uncommitted work if you arent ready to commit it
git stash
#...do the rebase, then bring your changes back
git stash pop
```

If you try to rebase with a dirty tree you will get this.

```text title="Terminal output"
error: cannot rebase: Your index contains uncommitted changes.
error: Please commit or stash them.
```

Lets say we only want to change the N number of last commits, run this

```bash title="Terminal"
git rebase -i HEAD~N
```

The terminal will open into your preferred text editor of choice. If it opens something you dont recognise, git is falling back to a default, set yours with `git config --global core.editor "nvim"`.

```
pick a46c438 # feat: added a constant needed for motors
pick 7f2b91c # feat: changed constant since it was wrong
pick c03d5ea # feat: changed constant again since it was wrong
pick 1e8fa47 # feat: changed constant once more since it was wrong
pick b592d03 # feat: finalized constant

# Rebase 3b44697..b592d03 onto 3b44697 (5 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
#         create a merge commit using the original merge commit's
#         message (or the oneline, if no original merge commit was
#         specified); use -c <commit> to reword the commit message
# u, update-ref <ref> = track a placeholder for the <ref> to be updated
#                       to this position in the new commits. The <ref> is
#                       updated at the end of the rebase
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```

You only edit the command word at the start of each line. Everything after the commit hash is just the subject line for your reference, git ignores it, so dont worry about keeping it tidy. Lets say i want to take all of these commits and squash them into one, and also throw away `1e8fa47` completely.

```
pick a46c438 # feat: added a constant needed for motors
squash 7f2b91c # feat: changed constant since it was wrong
squash c03d5ea # feat: changed constant again since it was wrong
drop 1e8fa47 # feat: changed constant once more since it was wrong
squash b592d03 # feat: finalized constant
```

That leaves you with a single commit containing the work from `a46c438`, `7f2b91c`, `c03d5ea` and `b592d03`. The changes from `1e8fa47` are gone entirely.

The lines execute top to bottom, and each `squash` melds **into the nearest `pick` above it**. So to end up with 2 distinct commits, use a second `pick` to start the next group.

```
pick a46c438 # feat: added a constant needed for motors
squash 7f2b91c # feat: changed constant since it was wrong
pick c03d5ea # feat: changed constant again since it was wrong
drop 1e8fa47 # feat: changed constant once more since it was wrong
squash b592d03 # feat: finalized constant
```

This gives you exactly two commits:

- the first holds `a46c438` + `7f2b91c`
- the second holds `c03d5ea` + `b592d03`

`1e8fa47` is discarded outright, it does not get squashed into anything. Note that `drop` sitting between a `pick` and a `squash` doesnt break the group, `b592d03` still melds into `c03d5ea`.

> [!NOTE]
> The first line can never be a `squash` or `fixup`, there has to be a `pick` above it to meld into. If you get this wrong git stops with `error: cannot 'squash' without a previous commit` and you can fix it with `git rebase --edit-todo`.

#### squash vs fixup

Both combine commits, they only differ in what happens to the commit message.

| Command  | What it does to the message                                              |
| -------- | ------------------------------------------------------------------------ |
| `squash` | Opens an editor with **all** the messages so you can write the final one |
| `fixup`  | Silently keeps only the message of the `pick` it melds into              |

Since the whole point here is usually to get rid of messages like "changed constant again", `fixup` is often what you actually want. Use `squash` when you want to write a proper combined message by hand.

You can also use `reword` to fix a single commit message without combining anything.

### Rebasing an entire branch

The warnings above still apply. A good habit is to do the rebase on a throwaway copy of your branch first, so that if it goes badly your original branch is untouched.

```bash title="Terminal"
#Switch to working branch
git switch feat/motor-interface
#Make a new branch off that working branch
git switch -c feat/motor-interface-rebase
#Rebase every commit that isnt already on main
git rebase -i main
```

The todo file looks exactly the same and is still ordered oldest to newest, so all the techniques above carry over unchanged. There is one important difference from `HEAD~N` though.

`git rebase -i HEAD~N` keeps your branch where it is and only rewrites the last N commits. `git rebase -i main` **also moves your base**, replaying your commits on top of whatever `main` currently points at. That means you pick up everyone elses recent work in the same operation, and it is where most conflicts come from. If you only want to clean up messages and not move the base, use `HEAD~N`.

Once the rebase looks right on the copy, get it back onto your real branch.

```bash title="Terminal"
#Check the history is what you expect
git log --oneline
#Move your real branch to the cleaned up history
git switch feat/motor-interface
git reset --hard feat/motor-interface-rebase
#Clean up the copy
git branch -d feat/motor-interface-rebase
```

Alternatively just open the pull request from `feat/motor-interface-rebase` and leave the original branch alone entirely, which is the safest option if other people are branched off it.

### When the rebase stops partway

Rebases stop as soon as a commit doesnt apply cleanly, which happens a lot, especially if you dropped or reordered commits that touch the same lines. Git will tell you which commit failed.

```text title="Terminal output"
CONFLICT (content): Merge conflict in src/can/MIT_frame.cpp
error: could not apply b592d03... feat: finalized constant
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
```

This is normal and not a sign you broke anything. You have three options.

```bash title="Terminal"
#Fix the conflict markers in the listed files, stage them, then carry on
git add src/can/MIT_frame.cpp
git rebase --continue
#Or throw away just the commit that wont apply
git rebase --skip
#Or give up and put everything back exactly how it was
git rebase --abort
```

`git rebase --abort` is always safe, it returns your branch to the state it was in before you started. If you are unsure what is going on, abort and start over rather than pushing something half finished.

### Pushing after a rebase

Because rebasing gives every rewritten commit a new hash, your local branch and the remote branch have genuinely different histories. A normal `git push` will be rejected.

```bash title="Terminal"
git push --force-with-lease
```

> [!WARNING]
> Use `--force-with-lease`, not `--force`. `--force-with-lease` refuses to push if someone else has pushed to that branch since you last fetched, so you cant silently wipe out a teammates work. Plain `--force` will happily destroy it.
> Never rebase or force push `main`, or any branch that other people have open pull requests against.

### If you make a mistake

Rebases are recoverable. Git keeps a log of everywhere `HEAD` has been for about 90 days, even for commits that arent on any branch anymore.

```bash title="Terminal"
#Find the commit you were on before the rebase
git reflog
#Go back to it
git reset --hard <hash-from-reflog>
```

`git reset --hard ORIG_HEAD` is a shortcut that usually works immediately after a bad rebase. The one thing reflog cannot bring back is uncommitted work destroyed by `git reset --hard`, so commit or stash before you start.
