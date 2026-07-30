import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { DocsConfig, SidebarConfig, SidebarItem, SidebarLinkItem } from "./schema.js";

function basenameOfSlug(slug: string): string {
    return slug.split("/").pop()!;
}

function firstSlug(items: SidebarItem[]): string | null {
    for (const item of items) {
        if ("items" in item) {
            const found = firstSlug(item.items);
            if (found) return found;
        } else if (item.slug) {
            return item.slug;
        }
    }
    return null;
}

async function writeMeta(dir: string, meta: Record<string, unknown>): Promise<void> {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf-8");
}

/**
 * Writes Fumadocs `meta.json` files into the project's docs/ directory (and
 * its subfolders) from the config's `sidebar` array - category groups map to
 * subfolders sharing their items' slug prefix, matching how the aggregator
 * site does this in scripts/generate-sources.mjs. Categories render flat and
 * expanded (no accordion), matching the main site's sidebar.
 *
 * A no-op if the project has no explicit `sidebar` - Fumadocs then falls
 * back to auto-ordering from the docs/ file tree, same as before.
 */
export async function generateMetaFiles(config: DocsConfig, docsDir: string): Promise<void> {
    const sidebar: SidebarConfig | undefined = config.sidebar;
    if (!sidebar || !existsSync(docsDir)) return;

    const rootPages: string[] = [];

    for (const item of sidebar) {
        if ("items" in item) {
            const sampleSlug = firstSlug(item.items);
            if (!sampleSlug) continue; // group has no local doc to anchor a folder to
            const folderName = sampleSlug.split("/")[0];
            rootPages.push(folderName);

            const groupPages = item.items
                .filter((sub): sub is SidebarLinkItem => "slug" in sub && !!sub.slug)
                .map((sub) => basenameOfSlug(sub.slug!));

            await writeMeta(path.join(docsDir, folderName), {
                title: item.label,
                ...(item.icon && { icon: item.icon }),
                pages: groupPages,
                defaultOpen: true,
                collapsible: false,
            });
        } else if (item.slug) {
            rootPages.push(basenameOfSlug(item.slug));
        }
    }

    await writeMeta(docsDir, {
        title: config.name,
        ...(config.icon && { icon: config.icon }),
        pages: rootPages,
    });
}
