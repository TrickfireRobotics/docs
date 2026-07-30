---
title: Pull Requests & Collaboration
description: Working in parallel on branches, and how we open and review pull requests
---

# Pull Requests & Collaboration

## Working in parallel on a branch

One of the most common things we've heard from people in the club is that they aren't sure how to work in parallel with someone else on the same branch. Here's what we suggest for changes that are more than a few lines of actual code.

Let's say a teammate is working on a branch called `feat/fix-the-rover` that has active development happening, and you want to build a specific feature on top of their in-progress work without touching `main`. You can branch off of their branch like this:

```bash
# enter their branch
git switch feat/fix-the-rover

# branch off of their branch
git checkout -b feat/fix-the-rover-wheels
```

Then write your code and open a pull request from `feat/fix-the-rover-wheels` into `feat/fix-the-rover` through GitHub.

This has a couple of benefits: the branch owner can see exactly what changed between the two branches, and can resolve any merge conflicts while keeping whichever parts of their work and yours they want. For smaller changes this typically isn't necessary, but if the code touches a sizeable chunk of the codebase or multiple files, it's best to make the changes in a separate branch and merge them in.

Now, say they recently pushed some new code you want to pull into your branch so you can develop against the latest version. Run the following:

```bash
# Pull a single file
git checkout branch-name -- path/to/file.txt

# Pull a folder
git checkout branch-name -- path/to/folder/

# Pull multiple files/folders
git checkout branch-name -- file1.txt folder/ file2.txt
```

Then commit and push the changes to the branch you're working on.

## Opening a pull request

Once a feature you're working on is finished, open a PR. We've had issues in the past with branches living for months or even years, without ever being merged into `main`, so as soon as you're done, open a PR and request review from the appropriate people. (Team lead, collaborators, software lead, and any others you think should review)

## Reviewing a pull request

When reviewing a PR, make sure to do your due diligence. It's very easy to drop an `LGTM!` and move on. Check that the code works, meets the repo's standards, follows proper styling and formatting, and is of generally good quality.
