export interface SidebarLinkItem {
    label: string;
    slug?: string;
    link?: string;
}

export interface SidebarGroup {
    label: string;
    items: SidebarItem[];
    /** lucide-react icon name, e.g. "Rocket". Rendered next to the category label. */
    icon?: string;
}

export type SidebarItem = SidebarLinkItem | SidebarGroup;
export type SidebarConfig = SidebarItem[];

export interface SocialLink {
    icon: string;
    label: string;
    href: string;
}

export type SocialLinks = SocialLink[];

export interface DocsConfig {
    name: string;
    description: string;
    /** lucide-react icon name, e.g. "LayoutDashboard". Shown in the project switcher and homepage cards. */
    icon?: string;
    sidebar?: SidebarConfig;
    social?: SocialLinks;
}
