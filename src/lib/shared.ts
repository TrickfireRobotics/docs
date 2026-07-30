export const appName = "TrickFire Robotics";

export const gitConfig = {
    user: "TrickfireRobotics",
    repo: "docs",
    branch: "main",
};

export const NAVBAR_LINKS = [
    { href: "https://trickfirerobotics.com", label: "Website", icon: "website" },
    { href: `https://github.com/${gitConfig.user}`, label: "GitHub", icon: "github" },
    {
        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
        label: "Notion",
        icon: "notion",
    },
] as const;
