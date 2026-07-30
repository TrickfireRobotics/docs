import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
    output: "export",
    reactStrictMode: true,
    images: { unoptimized: true },
    typescript: { tsconfigPath: "./tsconfig.site.json" },
    experimental: { externalDir: true },
};

export default withMDX(config);
