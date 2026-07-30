import type { ShikiTransformer } from "shiki";

const DEFAULT_TITLES: Record<string, string> = {
    bash: "Terminal",
    sh: "Terminal",
    shell: "Terminal",
    shellscript: "Terminal",
    zsh: "Terminal",
    env: "Terminal",
    json: "JSON",
    json5: "JSON",
    yaml: "YAML",
    yml: "YAML",
    ts: "TypeScript",
    tsx: "TypeScript",
    js: "JavaScript",
    jsx: "JavaScript",
    py: "Python",
    python: "Python",
    md: "Markdown",
    mdx: "MDX",
    txt: "Text",
    text: "Text",
    diff: "Diff",
    dockerfile: "Dockerfile",
    nginx: "nginx",
    toml: "TOML",
    ini: "INI",
};

/** Codeblocks without an explicit `title="..."` still get the terminal-window
 * header (icon + title + copy button) instead of falling back to a bare box. */
export function transformerDefaultTitle(): ShikiTransformer {
    return {
        name: "trickfire:default-title",
        pre(pre) {
            const lang = this.options.lang as string | undefined;
            if (!lang || pre.properties.title) return;
            pre.properties.title = DEFAULT_TITLES[lang] ?? lang;
        },
    };
}

const SHELL_LANGS = new Set(["bash", "sh", "shell", "shellscript", "zsh", "env"]);

/** Prefix shell command lines with a dimmed `$ ` - comments and blank lines
 * (and anything already indented, e.g. wrapped continuations) are left alone. */
export function transformerShellPrompt(): ShikiTransformer {
    return {
        name: "trickfire:shell-prompt",
        line(node, line) {
            const lang = this.options.lang as string | undefined;
            if (!lang || !SHELL_LANGS.has(lang)) return;
            const text = this.source.split("\n")[line - 1] ?? "";
            if (text.trim() === "" || /^\s/.test(text) || text.trimStart().startsWith("#")) return;

            node.children.unshift({
                type: "element",
                tagName: "span",
                properties: { className: ["tf-prompt"] },
                children: [{ type: "text", value: "$ " }],
            });
        },
    };
}
