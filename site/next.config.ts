import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
    output: "export",
    reactStrictMode: true,
    images: { unoptimized: true },
    experimental: { externalDir: true },
    devIndicators: { position: "bottom-right" },
};

export default withMDX(config);
