import { getRepoMeta, getSource, repoIds } from "@/lib/source";
import { createSearchAPI, type AdvancedIndex } from "fumadocs-core/search/server";

// Combined cross-repo search index for the home page

export const revalidate = false;

interface SearchPageData {
    title?: string;
    description?: string;
    structuredData?: unknown;
    load?: () => Promise<{ structuredData: unknown }>;
}

async function buildIndexes(): Promise<AdvancedIndex[]> {
    const indexes: AdvancedIndex[] = [];

    for (const repoId of repoIds) {
        const source = getSource(repoId);
        if (!source) continue;
        const repoName = getRepoMeta(repoId)?.name ?? repoId;

        const pages = source.getPages() as { data: SearchPageData; url: string }[];
        for (const page of pages) {
            let structuredData = page.data.structuredData;
            if (typeof structuredData === "function") structuredData = await structuredData();
            if (!structuredData && typeof page.data.load === "function") {
                structuredData = (await page.data.load()).structuredData;
            }
            if (!structuredData) continue;

            indexes.push({
                id: page.url,
                url: page.url,
                title: page.data.title ?? page.url,
                description: page.data.description,
                breadcrumbs: [repoName],
                tag: repoId,
                structuredData: structuredData as never,
            });
        }
    }

    return indexes;
}

export async function GET() {
    const { staticGET } = createSearchAPI("advanced", {
        indexes: buildIndexes,
        language: "english",
    });
    return staticGET();
}
