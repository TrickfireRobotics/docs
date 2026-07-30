import path from "node:path";
import { spawn } from "node:child_process";
import { loadDocsConfig } from "../config/load.js";
import { generateMetaFiles } from "../config/meta.js";
import {
    copySiteTemplate,
    ensureSiteNodeModules,
    ensureSitePublicDir,
    findNextBin,
} from "../utils/site.js";

export async function runDev(projectRoot: string, port = 3000): Promise<void> {
    const config = await loadDocsConfig(projectRoot);

    const trickfireDir = path.join(projectRoot, ".trickfire-docs");
    copySiteTemplate(trickfireDir);

    await generateMetaFiles(config, path.join(projectRoot, "docs"));
    await ensureSiteNodeModules(path.join(trickfireDir, "node_modules"));
    await ensureSitePublicDir(path.join(trickfireDir, "public"), projectRoot);

    const bin = await findNextBin();

    await new Promise<void>((resolve, reject) => {
        const child = spawn(process.execPath, [bin, "dev", "--webpack", "-p", String(port)], {
            cwd: trickfireDir,
            stdio: "inherit",
        });
        child.on("close", (code) => {
            if (code === 0 || code === null) resolve();
            else reject(new Error(`next dev exited with code ${code}`));
        });
        child.on("error", reject);
    });
}
