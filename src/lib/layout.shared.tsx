import type { BaseLayoutProps, LayoutTab } from "fumadocs-ui/layouts/shared";
import { NAVBAR_LINKS } from "./shared";
import { repos } from "./source";
import { resolveProjectIcon } from "./icon";
import { GithubIcon, NotionIcon, WebsiteIcon } from "@/components/brand-icons";
import { NavTitle } from "@/components/nav-title";

const BRAND_ICONS = { website: WebsiteIcon, github: GithubIcon, notion: NotionIcon } as const;

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: NavTitle,
        },
        themeSwitch: { enabled: false },
        links: NAVBAR_LINKS.map((link) => {
            const Icon = BRAND_ICONS[link.icon];
            return {
                type: "icon" as const,
                label: link.label,
                icon: <Icon className="size-4" />,
                text: link.label,
                url: link.href,
                secondary: true,
            };
        }),
    };
}

export function projectTabs(): LayoutTab[] {
    return repos.map((repo) => ({
        url: `/${repo.id}`,
        icon: resolveProjectIcon(repo.icon, "size-5"),
        title: repo.name,
    }));
}
