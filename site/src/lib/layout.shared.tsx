import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { GithubIcon, NotionIcon, WebsiteIcon } from "@/components/brand-icons";
import { NavTitle } from "@/components/nav-title";

const NAVBAR_LINKS = [
    { href: "https://trickfirerobotics.com", label: "Website", Icon: WebsiteIcon },
    { href: "https://github.com/TrickfireRobotics", label: "GitHub", Icon: GithubIcon },
    {
        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
        label: "Notion",
        Icon: NotionIcon,
    },
] as const;

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: NavTitle,
        },
        themeSwitch: { enabled: false },
        links: NAVBAR_LINKS.map(({ href, label, Icon }) => ({
            type: "icon" as const,
            label,
            icon: <Icon className="size-4" />,
            text: label,
            url: href,
            secondary: true,
        })),
    };
}
