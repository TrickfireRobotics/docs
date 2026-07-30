import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { docs, meta } from "collections/server";
import { resolveIcon } from "./icon";

export const source = loader({
    baseUrl: "/",
    source: toFumadocsSource(docs, meta),
    icon: (name) => resolveIcon(name),
});

interface TreeNode {
    type: "page" | "folder" | "separator";
    url?: string;
    index?: { url: string };
    children?: TreeNode[];
}

/** First leaf page in page-tree order - used to redirect `/` to the first
 * sidebar entry when the project has no root "index" doc (the common case). */
export function firstPageUrl(nodes: TreeNode[]): string | undefined {
    for (const node of nodes) {
        if (node.type === "page" && node.url) return node.url;
        if (node.type === "folder") {
            if (node.index?.url) return node.index.url;
            const found = firstPageUrl(node.children ?? []);
            if (found) return found;
        }
    }
    return undefined;
}
