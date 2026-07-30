import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
    {
        ignores: [
            "**/dist",
            "**/dist-cli",
            "**/node_modules",
            "**/coverage",
            "**/.next",
            "**/.source",
            "**/out",
            "content",
            "commitlint.config.cjs",
            "release.config.cjs",
            "next-env.d.ts",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["scripts/**/*.mjs", "*.config.{js,mjs,ts}"],
        languageOptions: { globals: globals.node },
    },
    prettierConfig
);
