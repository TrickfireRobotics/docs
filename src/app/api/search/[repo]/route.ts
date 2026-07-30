import { getSource, repoIds } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const revalidate = false;

export function generateStaticParams() {
    return repoIds.map((repo) => ({ repo }));
}

export async function GET(_request: Request, props: { params: Promise<{ repo: string }> }) {
    const { repo } = await props.params;
    const source = getSource(repo);
    if (!source) return new Response("not found", { status: 404 });

    const { staticGET } = createFromSource(source, { language: "english" });
    return staticGET();
}
