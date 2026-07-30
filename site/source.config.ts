import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { rehypeCodeDefaultOptions, remarkAdmonition } from "fumadocs-core/mdx-plugins";
import { transformerDefaultTitle, transformerShellPrompt } from "./src/lib/shiki-transformers";

// `.trickfire-docs/` is always a direct child of the member repo root, so
// these relative paths are always correct - no need to generate this file
// per-project.
//
// Docs and meta.json are two independent collections (rather than one
// `defineDocs()`) so meta.json can live under `.trickfire-docs/meta/`
// instead of inside the project's `docs/` folder - the project's `docs/`
// should only ever contain hand-written markdown. Fumadocs matches the two
// collections up by relative path (see src/lib/source.ts's
// `toFumadocsSource` call), so `framework/config/meta.ts` mirrors `docs/`'s
// subfolder structure under `meta/` when it writes these files.
export const docs = defineCollections({
    type: "doc",
    dir: "../docs",
    files: ["**/*.{md,mdx}", "!assets/**"],
    schema: pageSchema,
});

export const meta = defineCollections({
    type: "meta",
    dir: "./meta",
    schema: metaSchema,
});

export default defineConfig({
    mdxOptions: {
        // Docusaurus-style `:::tip ... :::` admonitions, used throughout the
        // scaffold content - renders as Fumadocs' <Callout> automatically.
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
