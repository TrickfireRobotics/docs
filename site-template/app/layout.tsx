import { Overpass } from "next/font/google";
import { Provider } from "@/components/provider";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import "./global.css";

const overpass = Overpass({
    subsets: ["latin"],
    variable: "--font-overpass",
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={overpass.variable} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <Provider>
                    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
                        {children}
                    </DocsLayout>
                </Provider>
            </body>
        </html>
    );
}
