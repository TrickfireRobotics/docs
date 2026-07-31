import fs from "node:fs/promises";
import path from "node:path";
import { loadDocsConfig } from "../config/load.js";
import {
    cacheDir,
    ensurePnpm,
    ensureRepoCache,
    installCacheDeps,
    linkMemberProject,
    run,
} from "../utils/repo-cache.js";

export async function runBuild(projectRoot: string): Promise<void> {
    await loadDocsConfig(projectRoot);
    await ensurePnpm();

    const cache = cacheDir();
    await ensureRepoCache(cache);
    await linkMemberProject(cache, projectRoot);
    await installCacheDeps(cache);

    await run("pnpm", ["exec", "tsx", "scripts/generate-sources.ts"], { cwd: cache });
    await run("pnpm", ["exec", "next", "build", "--webpack"], {
        cwd: cache,
        env: { ...process.env, NODE_ENV: "production" },
    });

    const outDir = path.resolve(projectRoot, "dist");
    await fs.rm(outDir, { recursive: true, force: true });
    await fs.cp(path.join(cache, "out"), outDir, { recursive: true });
}
