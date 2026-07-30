import { Overpass } from "next/font/google";
import { Provider } from "@/components/provider";
import "./global.css";

const overpass = Overpass({
    subsets: ["latin"],
    variable: "--font-overpass",
});

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={overpass.variable} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
