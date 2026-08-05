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

export async function runDev(projectRoot: string, port = 3000): Promise<void> {
    log.heading("trickfire-docs dev");

    await loadDocsConfig(projectRoot);
    await log.step("checking pnpm", () => ensurePnpm());

    const cache = cacheDir();
    await log.step("syncing docs framework repo", () => ensureRepoCache(cache));
    await log.step("linking project", () => linkMemberProject(cache, projectRoot));
    await log.step("installing dependencies", () => installCacheDeps(cache));
    await log.step("generating content sources", () =>
        run("pnpm", ["exec", "tsx", "scripts/generate-sources.ts"], { cwd: cache })
    );

    log.info(`starting dev server on port ${port}`);
    log.blank();
    await run("pnpm", ["exec", "next", "dev", "--webpack", "-p", String(port)], {
        cwd: cache,
        stdio: "inherit",
    });
}
