import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { DocsConfig } from "./schema.js";

export async function loadDocsConfig(projectRoot: string): Promise<DocsConfig> {
    const configPath = path.join(projectRoot, "docs.config.json");
    if (!existsSync(configPath)) {
        throw new Error(
            `No docs.config.json found in ${projectRoot}.\n` +
                `Run \`trickfire-docs init\` to set up this repository.`
        );
    }
    const raw = await fs.readFile(configPath, "utf-8");
    return JSON.parse(raw) as DocsConfig;
}
