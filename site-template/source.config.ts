import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { rehypeCodeDefaultOptions, remarkAdmonition } from "fumadocs-core/mdx-plugins";
import { transformerDefaultTitle, transformerShellPrompt } from "./src/lib/shiki-transformers";

// `.trickfire-docs/` is always a direct child of the member repo root, so the
// project's `docs/` folder is always this same relative path — no need to
// generate this file per-project.
export const docs = defineDocs({
    dir: "../docs",
    docs: { schema: pageSchema },
    meta: { schema: metaSchema },
});

export default defineConfig({
    mdxOptions: {
        // Docusaurus-style `:::tip ... :::` admonitions, used throughout the
        // scaffold content — renders as Fumadocs' <Callout> automatically.
        // Must append (not replace) fumadocs-mdx's own default remark plugins.
        remarkPlugins: (v) => [...v, remarkAdmonition],
        rehypeCodeOptions: {
            ...rehypeCodeDefaultOptions,
            lazy: false,
            langAlias: { env: "bash" },
            transformers: [
                ...(rehypeCodeDefaultOptions.transformers ?? []),
                transformerDefaultTitle(),
                transformerShellPrompt(),
            ],
        },
    },
});
