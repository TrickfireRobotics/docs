import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { ProcessError } from "../logger.js";

const REPO_URL = "https://github.com/TrickfireRobotics/docs.git";

/** Shared by every project previewed on this machine - one clone, kept at
 * `origin/main`, not one per member repo. */
export function cacheDir(): string {
    return path.join(os.homedir(), ".cache", "trickfire-docs", "repo");
}

/** Defaults to piping stdio and only surfacing it (via ProcessError) on
 * failure, so setup commands (git/pnpm/tsx) don't spam raw output over
 * log.step()'s spinner - pass `stdio: "inherit"` for the long-lived/
 * user-facing commands (namely `next dev`/`next build`) that should stream
 * live instead. */
export function run(
    cmd: string,
    args: string[],
    options: { cwd: string; env?: NodeJS.ProcessEnv; stdio?: "inherit" | "pipe" } = { cwd: "." }
): Promise<void> {
    return new Promise((resolve, reject) => {
        const stdio = options.stdio ?? "pipe";
        const child = spawn(cmd, args, {
            cwd: options.cwd,
            env: options.env ?? process.env,
            stdio,
        });

        let output = "";
        if (stdio === "pipe") {
            child.stdout?.on("data", (chunk: Buffer) => (output += chunk));
            child.stderr?.on("data", (chunk: Buffer) => (output += chunk));
        }

        child.on("close", (code) => {
            if (code === 0) resolve();
            else
                reject(
                    new ProcessError(`${cmd} ${args.join(" ")} exited with code ${code}`, output)
                );
        });
        child.on("error", reject);
    });
}

/** trickfire-docs dev/build shell out to pnpm inside the cache clone so the
 * clone's own pnpm-specific patch (see patches/@fumadocs__base-ui@16.13.0.patch
 * in pnpm-workspace.yaml) actually applies - the same patch production builds
 * with. Fails fast with a clear message rather than a confusing ENOENT from
 * deep inside a spawned process. */
export async function ensurePnpm(): Promise<void> {
    try {
        await run("pnpm", ["--version"], { cwd: process.cwd(), stdio: "pipe" });
    } catch {
        throw new Error(
            "pnpm is required to run trickfire-docs locally.\n" +
                "Install it: npm install -g pnpm (or corepack enable)."
        );
    }
}

/** Clones TrickfireRobotics/docs on first use, otherwise resets to
 * origin/main - always latest, matching production, which pulls the same way
 * (scripts/build.sh). `reset --hard` only touches tracked files, so it never
 * disturbs the content/ symlinks managed by linkMemberProject.
 *
 * `dir` is a cache: nothing outside this module ever writes there, so if it
 * exists without a `.git` (an interrupted clone, a killed process, anything
 * left it half-built) it's wiped and re-cloned rather than treated as an
 * error - there's nothing in it worth preserving. */
export async function ensureRepoCache(dir: string): Promise<void> {
    if (!existsSync(path.join(dir, ".git"))) {
        await fs.rm(dir, { recursive: true, force: true });
        await fs.mkdir(path.dirname(dir), { recursive: true });
        await run("git", ["clone", "--depth", "1", REPO_URL, dir], { cwd: path.dirname(dir) });
        return;
    }
    await run("git", ["fetch", "--depth", "1", "origin", "main"], { cwd: dir });
    await run("git", ["reset", "--hard", "origin/main"], { cwd: dir });
}

/** Same install production runs (`scripts/build.sh`): `pnpm install
 * --frozen-lockfile`. `--prod` looks tempting to skip devDependencies-only
 * tooling (eslint, vitest, semantic-release, husky) that a preview never
 * needs, but this repo ships its own root `tsconfig.json` - Next's dev
 * server detects it, notices `typescript` is missing under `--prod`, and
 * silently kicks off its own unscoped `pnpm install` mid-startup that pulls
 * everything in anyway. Installing everything up front in one deterministic
 * step is simpler than that surprise double install. `--ignore-scripts`
 * skips husky's `prepare` hook, which is pointless in a throwaway clone
 * nobody commits to; `generate-sources.ts` (also normally run by
 * `postinstall`) is run explicitly as a separate step instead. */
export async function installCacheDeps(dir: string): Promise<void> {
    await run("pnpm", ["install", "--frozen-lockfile", "--ignore-scripts"], { cwd: dir });
}

async function isSymlink(p: string): Promise<boolean> {
    try {
        return (await fs.lstat(p)).isSymbolicLink();
    } catch {
        return false;
    }
}

async function ensureSymlink(linkPath: string, target: string): Promise<void> {
    try {
        await fs.symlink(target, linkPath, "dir");
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "EEXIST") {
            const existing = await fs.readlink(linkPath).catch(() => null);
            if (existing !== target) {
                await fs.rm(linkPath, { recursive: true, force: true });
                await fs.symlink(target, linkPath, "dir");
            }
        } else {
            throw err;
        }
    }
}

/**
 * Symlinks `projectRoot/docs` + `docs.config.json` into the cache clone's
 * `content/<repoId>/`, the same convention scripts/dev-link-docs.sh uses for
 * local maintainer testing. `repoId` matches production's default repo-name
 * convention (sync-docs.yml), so local preview lines up with what actually
 * gets deployed.
 *
 * Only ever one linked project lives in the cache at a time - any symlinked
 * project from a previous `dev`/`build` run for a *different* repo on this
 * machine is removed first, so content/ never accumulates stale projects.
 * `general` (tracked, always shown alongside the cli's own docs) is
 * never touched.
 */
export async function linkMemberProject(cacheDir: string, projectRoot: string): Promise<void> {
    const repoId = path.basename(projectRoot);
    const contentDir = path.join(cacheDir, "content");
    await fs.mkdir(contentDir, { recursive: true });

    for (const entry of await fs.readdir(contentDir, { withFileTypes: true })) {
        if (!entry.isDirectory() || entry.name === "general" || entry.name === repoId) continue;
        if (await isSymlink(path.join(contentDir, entry.name, "docs.config.json"))) {
            await fs.rm(path.join(contentDir, entry.name), { recursive: true, force: true });
        }
    }

    const linkDir = path.join(contentDir, repoId);
    await fs.mkdir(linkDir, { recursive: true });
    await ensureSymlink(path.join(linkDir, "docs"), path.join(projectRoot, "docs"));
    await ensureSymlink(
        path.join(linkDir, "docs.config.json"),
        path.join(projectRoot, "docs.config.json")
    );
}
