import fs from "node:fs/promises";
import { existsSync, readFileSync, cpSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

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
const SITE_TEMPLATE_DIR = path.join(PACKAGE_ROOT, "site-template");
const FRAMEWORK_PUBLIC_DIR = path.join(PACKAGE_ROOT, "public");

/** Copies the bundled single-project Fumadocs app template into
 * `<projectRoot>/.trickfire-docs/` - always overwritten so it stays in sync
 * with whatever trickfire-docs version generated it. */
export function copySiteTemplate(trickfireDir: string): void {
    cpSync(SITE_TEMPLATE_DIR, trickfireDir, { recursive: true });
}

async function ensureSymlink(linkPath: string, target: string): Promise<void> {
    try {
        await fs.symlink(target, linkPath, "dir");
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "EEXIST") {
            const existing = await fs.readlink(linkPath).catch(() => null);
            if (existing !== target) {
                await fs.rm(linkPath, { recursive: true, force: true });
                await fs.symlink(target, linkPath, "dir");
            }
        } else {
            throw err;
        }
    }
}

const _require = createRequire(import.meta.url);

/**
 * Symlinks the generated site's node_modules to trickfire-docs's own
 * node_modules as a single directory - not a per-package symlink farm, which
 * confused both Turbopack's workspace-root detection and webpack's tsconfig
 * path-alias resolution. A single directory symlink behaves identically to a
 * real install (pnpm's own .pnpm/ symlinking is unaffected by the extra hop),
 * and needs no per-dependency bookkeeping. Member repos never install any of
 * this themselves.
 */
export async function ensureSiteNodeModules(siteNodeModules: string): Promise<void> {
    await fs.mkdir(path.dirname(siteNodeModules), { recursive: true });
    await ensureSymlink(siteNodeModules, path.join(PACKAGE_ROOT, "node_modules"));
}

export async function findNextBin(): Promise<string> {
    const pkgJsonPath = _require.resolve("next/package.json");
    const pkgRoot = path.dirname(pkgJsonPath);
    const raw = await fs.readFile(pkgJsonPath, "utf-8");
    const pkg = JSON.parse(raw) as { bin?: Record<string, string> | string };
    const rel = typeof pkg.bin === "string" ? pkg.bin : (pkg.bin?.next ?? "dist/bin/next");
    return path.join(pkgRoot, rel);
}

/**
 * Populates `.trickfire-docs/public/` (Next's static-assets convention) from,
 * in override order: trickfire-docs's own defaults (logo, favicon), the
 * project's `docs/assets/` (referenced by relative paths in markdown, served
 * at `/assets`), then the project's own `public/` if it has one.
 */
export async function ensureSitePublicDir(publicDir: string, projectRoot: string): Promise<void> {
    await fs.mkdir(publicDir, { recursive: true });

    for (const name of ["logo.png", "nav-logo.png", "favicon.ico", "docs.config.schema.json"]) {
        const src = path.join(FRAMEWORK_PUBLIC_DIR, name);
        if (existsSync(src)) await ensureSymlink(path.join(publicDir, name), src);
    }

    const docsAssets = path.join(projectRoot, "docs", "assets");
    if (existsSync(docsAssets)) {
        await ensureSymlink(path.join(publicDir, "assets"), docsAssets);
    }

    const projectPublic = path.join(projectRoot, "public");
    if (existsSync(projectPublic)) {
        for (const entry of await fs.readdir(projectPublic)) {
            await ensureSymlink(path.join(publicDir, entry), path.join(projectPublic, entry));
        }
    }
}
