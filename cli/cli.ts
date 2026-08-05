import { runBuild } from "./commands/build.js";
import { runDev } from "./commands/dev.js";
import { runInit } from "./commands/init.js";
import { log, wasInterrupted } from "./logger.js";

const [, , command, ...args] = process.argv;
const projectRoot = process.env.INIT_CWD ?? process.cwd();

async function main(): Promise<void> {
    switch (command) {
        case "dev":
            await runDev(projectRoot);
            break;
        case "build":
            await runBuild(projectRoot);
            break;
        case "init":
            await runInit(projectRoot, { force: args.includes("--force") });
            break;
        default:
            log.error("Usage: trickfire-docs <dev|build|init> [--force]");
            process.exit(1);
    }
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
