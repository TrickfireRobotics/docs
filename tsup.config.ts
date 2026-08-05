import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: { cli: "cli/cli.ts" },
        format: ["esm"],
        banner: { js: "#!/usr/bin/env node" },
        tsconfig: "tsconfig.cli.json",
        outDir: "dist-cli",
        clean: true,
    },
    {
        entry: { index: "cli/index.ts" },
        format: ["esm"],
        dts: true,
        tsconfig: "tsconfig.cli.json",
        outDir: "dist-cli",
        clean: false,
    },
]);
