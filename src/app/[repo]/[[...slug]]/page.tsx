import { firstPageUrl, getSource, repoIds } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { notFound, redirect } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";

interface PageData {
    title: string;
    description?: string;
    toc: React.ComponentProps<typeof DocsPage>["toc"];
    full?: boolean;
    body: React.ComponentType<{ components?: ReturnType<typeof getMDXComponents> }>;
}

export default async function Page(props: { params: Promise<{ repo: string; slug?: string[] }> }) {
    const { repo, slug } = await props.params;
    const source = getSource(repo) as
        | { getPage: (slug?: string[]) => unknown; getPageTree: () => { children: unknown[] } }
        | undefined;
    if (!source) notFound();
    const page = source.getPage(slug) as { data: PageData; url: string } | undefined;
    if (!page) {
        // Most repos don't have a root "index" doc — bounce bare `/[repo]` to
        // the first item in the sidebar instead of 404ing.
        if (!slug || slug.length === 0) {
            const target = firstPageUrl(source.getPageTree().children as never);
            if (target) redirect(target);
        }
        notFound();
    }

    const data = page.data;
    const MDX = data.body;

    return (
        <DocsPage toc={data.toc} full={data.full}>
            <DocsTitle>{data.title}</DocsTitle>
            <DocsDescription className="mb-0">{data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        a: createRelativeLink(source as never, page as never),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return repoIds.flatMap((repo) => {
        const source = getSource(repo);
        if (!source) return [];
        const params = source
            .generateParams()
            .map((p: { slug?: string[] }) => ({ repo, slug: p.slug }));
        // Most repos have no root "index" doc, so `generateParams()` never
        // produces the bare `/[repo]` path — add it explicitly so the redirect
        // in the page component actually gets prerendered as a static file
        // instead of 404ing once this is a static export.
        const hasRoot = params.some((p: { slug?: string[] }) => !p.slug || p.slug.length === 0);
        if (!hasRoot) params.push({ repo, slug: undefined });
        return params;
    });
}

export async function generateMetadata(props: {
    params: Promise<{ repo: string; slug?: string[] }>;
}): Promise<Metadata> {
    const { repo, slug } = await props.params;
    const source = getSource(repo) as { getPage: (slug?: string[]) => unknown } | undefined;
    if (!source) notFound();
    const page = source.getPage(slug) as { data: PageData; url: string } | undefined;
    if (!page) {
        if (!slug || slug.length === 0) return {};
        notFound();
    }

    const data = page.data;
    return {
        title: data.title,
        description: data.description,
    };
}
