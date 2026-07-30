---
title: Writing Content
description: Frontmatter, Markdown features, and page conventions.
---

Every page needs frontmatter with at least a `title`:

```md title="docs/guides/example.md"
---
title: Page Title
description: Shown in search results and social previews.
---

Your content here.
```

## Formatting

Standard Markdown works as expected - headings, lists, tables, links, and fenced code blocks with syntax highlighting:

```bash title="Terminal"
echo "code blocks support a title and language"
```

## Callouts

Use asides to highlight important information:

:::note
A neutral callout for extra context.

:::

:::caution
A warning callout for things readers should be careful about.

:::

## MDX

Files ending in `.mdx` can import and use components, like `CardGrid`/`LinkCard` from Starlight, alongside regular Markdown.
