import fs from "node:fs/promises";
import path from "node:path";
import { loadDocsConfig } from "../config/load.js";
import { log } from "../logger.js";
import {
    cacheDir,
    ensurePnpm,
    ensureRepoCache,
    installCacheDeps,
    linkMemberProject,
    run,
} from "../utils/repo-cache.js";

export async function runBuild(projectRoot: string): Promise<void> {
    log.heading("trickfire-docs build");

    await loadDocsConfig(projectRoot);
    await log.step("checking pnpm", () => ensurePnpm());

    const cache = cacheDir();
    await log.step("syncing docs cli repo", () => ensureRepoCache(cache));
    await log.step("linking project", () => linkMemberProject(cache, projectRoot));
    await log.step("installing dependencies", () => installCacheDeps(cache));
    await log.step("generating content sources", () =>
        run("pnpm", ["exec", "tsx", "scripts/generate-sources.ts"], { cwd: cache })
    );

    log.info("building site");
    log.blank();
    await run("pnpm", ["exec", "next", "build", "--webpack"], {
        cwd: cache,
        env: { ...process.env, NODE_ENV: "production" },
        stdio: "inherit",
    });

    const outDir = path.resolve(projectRoot, "dist");
    await log.step("copying build output", async () => {
        await fs.rm(outDir, { recursive: true, force: true });
        await fs.cp(path.join(cache, "out"), outDir, { recursive: true });
    });

    log.success(`build complete → ${path.relative(projectRoot, outDir) || "dist"}`);
}
