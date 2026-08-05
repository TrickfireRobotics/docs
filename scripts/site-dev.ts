// `pnpm site:dev` - branded wrapper so the framework's own maintainer dev
// loop looks like `trickfire-docs dev` (framework/commands/dev.ts) rather
// than a raw `tsx ... && next dev` shell chain.
import { log, wasInterrupted } from "../framework/logger.js";
import { run } from "../framework/utils/repo-cache.js";

const port = process.argv[2] ?? "3100";

async function main(): Promise<void> {
    log.heading("trickfire-docs site:dev");

    await log.step("generating content sources", () =>
        run("pnpm", ["exec", "tsx", "scripts/generate-sources.ts"], { cwd: process.cwd() })
    );

    log.info(`starting dev server on port ${port}`);
    log.blank();
    await run("pnpm", ["exec", "next", "dev", "--webpack", "-p", port], {
        cwd: process.cwd(),
        stdio: "inherit",
    });
}

main().catch((error: unknown) => {
    if (wasInterrupted()) {
        log.blank();
        log.info("Stopped succesfully");
        return;
    }
    if (!(error instanceof Error && (error as Error & { reported?: boolean }).reported)) {
        log.error(error instanceof Error ? error.message : String(error));
    }
    process.exit(1);
});
