import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: { cli: "framework/cli.ts" },
        format: ["esm"],
        banner: { js: "#!/usr/bin/env node" },
        tsconfig: "tsconfig.cli.json",
        outDir: "dist-cli",
        clean: true,
    },
    {
        entry: { index: "framework/index.ts" },
        format: ["esm"],
        dts: true,
        tsconfig: "tsconfig.cli.json",
        outDir: "dist-cli",
        clean: false,
    },
]);
