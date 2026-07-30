import fs from "node:fs/promises";
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

export async function runBuild(projectRoot: string): Promise<void> {
    const config = await loadDocsConfig(projectRoot);

    const trickfireDir = path.join(projectRoot, ".trickfire-docs");
    copySiteTemplate(trickfireDir);

    await generateMetaFiles(
        config,
        path.join(projectRoot, "docs"),
        path.join(trickfireDir, "meta")
    );
    await ensureSiteNodeModules(path.join(trickfireDir, "node_modules"));
    await ensureSitePublicDir(path.join(trickfireDir, "public"), projectRoot);

    const bin = await findNextBin();

    await new Promise<void>((resolve, reject) => {
        const child = spawn(process.execPath, [bin, "build", "--webpack"], {
            cwd: trickfireDir,
            stdio: "inherit",
            env: { ...process.env, NODE_ENV: "production" },
        });
        child.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`next build exited with code ${code}`));
        });
        child.on("error", reject);
    });

    const outDir = path.resolve(projectRoot, "dist");
    await fs.rm(outDir, { recursive: true, force: true });
    await fs.cp(path.join(trickfireDir, "out"), outDir, { recursive: true });
}
