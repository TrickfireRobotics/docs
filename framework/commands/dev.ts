import { loadDocsConfig } from "../config/load.js";
import {
    cacheDir,
    ensurePnpm,
    ensureRepoCache,
    installCacheDeps,
    linkMemberProject,
    run,
} from "../utils/repo-cache.js";

export async function runDev(projectRoot: string, port = 3000): Promise<void> {
    await loadDocsConfig(projectRoot);
    await ensurePnpm();

    const cache = cacheDir();
    await ensureRepoCache(cache);
    await linkMemberProject(cache, projectRoot);
    await installCacheDeps(cache);

    await run("pnpm", ["exec", "tsx", "scripts/generate-sources.ts"], { cwd: cache });
    await run("pnpm", ["exec", "next", "dev", "--webpack", "-p", String(port)], { cwd: cache });
}
