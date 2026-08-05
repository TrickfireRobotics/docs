import fs from "node:fs/promises";
import path from "node:path";
import type { DocsConfig, SocialLinks } from "./schema.js";

const SITE_DOMAIN = "https://docs.trickfirerobotics.com";
const GITHUB_ORG = "TrickfireRobotics";

// Always present in the nav, identical across every TrickFire docs site.
const FIXED_SOCIAL: SocialLinks = [
    {
        icon: "external",
        label: "Notion",
        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
    },
    { icon: "external", label: "TrickFire Robotics", href: SITE_DOMAIN },
];

export interface ResolvedDocsConfig extends DocsConfig {
    site: string;
    base: string;
    social: SocialLinks;
}

async function readProjectName(projectRoot: string): Promise<string> {
    const pkgPath = path.join(projectRoot, "package.json");
    try {
        const raw = await fs.readFile(pkgPath, "utf-8");
        const pkg = JSON.parse(raw) as { name?: string };
        if (pkg.name) return pkg.name;
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }
    return path.basename(projectRoot);
}

export async function resolveDocsConfig(
    projectRoot: string,
    config: DocsConfig
): Promise<ResolvedDocsConfig> {
    const repoName = await readProjectName(projectRoot);
    const githubSocial: SocialLinks[number] = {
        icon: "github",
        label: "GitHub",
        href: `https://github.com/${GITHUB_ORG}/${repoName}`,
    };

    return {
        ...config,
        site: SITE_DOMAIN,
        base: `/${repoName}`,
        social: [githubSocial, ...FIXED_SOCIAL, ...(config.social ?? [])],
    };
}
