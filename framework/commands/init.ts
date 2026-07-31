import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findPackageRoot(startDir: string): string {
    let dir = startDir;
    while (true) {
        const pkgPath = path.join(dir, "package.json");
        if (existsSync(pkgPath)) {
            try {
                const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as { name?: string };
                if (pkg.name === "trickfire-docs") return dir;
            } catch {
                // not our package.json, keep searching
            }
        }
        const parent = path.dirname(dir);
        if (parent === dir) throw new Error("trickfire-docs package root not found");
        dir = parent;
    }
}

const PACKAGE_ROOT = findPackageRoot(path.dirname(fileURLToPath(import.meta.url)));
const SCAFFOLD_DIR = path.join(PACKAGE_ROOT, "scaffold");

export interface InitOptions {
    force?: boolean;
}

const SCAFFOLD_FILES: Array<[string, string]> = [
    ["docs.config.json", "docs.config.json"],
    [".github/workflows/docs.yml", ".github/workflows/docs.yml"],
];

const SCAFFOLD_DOCS: Array<[string, string]> = [
    ["docs/getting-started.mdx", "docs/getting-started.mdx"],
    ["docs/guides/writing-content.mdx", "docs/guides/writing-content.mdx"],
    ["docs/guides/organizing-sidebar.mdx", "docs/guides/organizing-sidebar.mdx"],
    ["docs/reference/configuration.mdx", "docs/reference/configuration.mdx"],
    ["docs/reference/faq.mdx", "docs/reference/faq.mdx"],
];

export async function runInit(projectRoot: string, options: InitOptions = {}): Promise<void> {
    const configDest = path.join(projectRoot, "docs.config.json");
    const docsDest = path.join(projectRoot, "docs");

    if (existsSync(configDest) && !options.force) {
        console.log("Already initialized. Use --force to re-scaffold.");
        return;
    }

    for (const [src, dest] of SCAFFOLD_FILES) {
        const srcPath = path.join(SCAFFOLD_DIR, src);
        const destPath = path.join(projectRoot, dest);
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.copyFile(srcPath, destPath);
        console.log(`  created  ${dest}`);
    }

    let docsEmpty = true;
    if (existsSync(docsDest)) {
        const entries = await fs.readdir(docsDest);
        docsEmpty = entries.length === 0;
    }

    if (!existsSync(docsDest) || docsEmpty || options.force) {
        for (const [src, dest] of SCAFFOLD_DOCS) {
            const srcPath = path.join(SCAFFOLD_DIR, src);
            const destPath = path.join(projectRoot, dest);
            await fs.mkdir(path.dirname(destPath), { recursive: true });
            await fs.copyFile(srcPath, destPath);
            console.log(`  created  ${dest}`);
        }
    } else {
        console.log("docs directory is not empty. Use --force to re-scaffold.");
    }

    // Append trickfire-docs entries to .gitignore
    const gitignorePath = path.join(projectRoot, ".gitignore");
    const gitignoreAddition = "\n# trickfire-docs\ndist/\n";
    if (existsSync(gitignorePath)) {
        const content = await fs.readFile(gitignorePath, "utf-8");
        if (!content.includes("# trickfire-docs")) {
            await fs.appendFile(gitignorePath, gitignoreAddition);
        }
    } else {
        await fs.writeFile(gitignorePath, gitignoreAddition.trimStart(), "utf-8");
    }

    console.log("\nDone. Edit docs.config.json, then run: npx trickfire-docs dev");
}
