import { loader } from "fumadocs-core/source";
import * as generated from "collections/server";
import varToRepoId from "../../content-sources.map.json" with { type: "json" };
import repoMeta from "../../repos.generated.json" with { type: "json" };
import { resolveIcon } from "./icon";

export interface RepoMeta {
    id: string;
    name: string;
    description: string;
    icon: string | null;
}

export const repos: RepoMeta[] = repoMeta;
export const repoIds: string[] = repos.map((r) => r.id);

const idToVar = varToRepoId as Record<string, string>;
const generatedAny = generated as Record<string, { toFumadocsSource: () => unknown }>;

const sources = Object.fromEntries(
    Object.entries(idToVar).map(([varName, repoId]) => [
        repoId,
        loader({
            baseUrl: `/${repoId}`,
            source: generatedAny[varName].toFumadocsSource() as never,
            icon: (name) => resolveIcon(name),
        }),
    ])
);

export function getSource(repoId: string) {
    return sources[repoId] as (typeof sources)[string] | undefined;
}

interface TreeNode {
    type: "page" | "folder" | "separator";
    url?: string;
    index?: { url: string };
    children?: TreeNode[];
}

/** First leaf page in page-tree order — used to redirect bare `/[repo]` URLs
 * (most repos don't have a root "index" doc, only a first sidebar item). */
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

export function getRepoMeta(repoId: string): RepoMeta | undefined {
    return repos.find((r) => r.id === repoId);
}
