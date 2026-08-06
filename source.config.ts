import { defineConfig } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerDefaultTitle, transformerShellPrompt } from "./src/lib/shiki-transformers";

export * from "./content-sources.generated";

export default defineConfig({
    mdxOptions: {
        rehypeCodeOptions: {
            ...rehypeCodeDefaultOptions,
            lazy: false,
            langAlias: {
                env: "bash",
            },
            transformers: [
                ...(rehypeCodeDefaultOptions.transformers ?? []),
                transformerDefaultTitle(),
                transformerShellPrompt(),
            ],
        },
    },
});
