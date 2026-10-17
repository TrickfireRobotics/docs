import fs from "node:fs";
import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const ROOT = process.cwd();

function commonAncestor(a: string, b: string): string {
    const aParts = a.split(path.sep);
    const bParts = b.split(path.sep);
    const common: string[] = [];
    for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
        if (aParts[i] !== bParts[i]) break;
        common.push(aParts[i]);
    }
    return common.join(path.sep) || path.sep;
}

// made synmlinks from dev-link-docs.sh work with turbopack
function turbopackRoot(): string {
    const contentDir = path.join(ROOT, "content");
    let root = ROOT;
    if (!fs.existsSync(contentDir)) return root;

    for (const repo of fs.readdirSync(contentDir)) {
        for (const name of ["docs", "docs.config.json"]) {
            const linkPath = path.join(contentDir, repo, name);
            if (!fs.existsSync(linkPath)) continue;
            root = commonAncestor(root, fs.realpathSync(linkPath));
        }
    }
    return root;
}

const config: NextConfig = {
    output: "export",
    reactStrictMode: true,
    images: { unoptimized: true },
    typescript: { tsconfigPath: "./tsconfig.site.json" },
    experimental: { externalDir: true },
    turbopack: { root: turbopackRoot() },
};

export default withMDX(config);
