import type { Metadata } from "next";
import { Barlow_Condensed, Overpass, Roboto_Mono } from "next/font/google";
import { DevBadge } from "@/components/dev-badge";
import { Provider } from "@/components/provider";
import { appName } from "@/lib/shared";
import "./global.css";

// Style guide p.7: Barlow Condensed Semi Bold for headers, Overpass for body,
// Roboto Mono for code. 700 italic is only used by the background wordmark.
const barlowCondensed = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["600", "700"],
    style: ["normal", "italic"],
    variable: "--font-barlow-condensed",
});

const overpass = Overpass({
    subsets: ["latin"],
    variable: "--font-overpass",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
    title: {
        default: appName,
        template: `%s | ${appName}`,
    },
    description: "Documentation for TrickFire Robotics projects",
};

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${overpass.variable} ${barlowCondensed.variable} ${robotoMono.variable}`}
            suppressHydrationWarning
        >
            <body className="flex flex-col min-h-screen">
                <DevBadge />
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
