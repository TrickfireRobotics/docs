import { firstPageUrl, source } from "@/lib/source";
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

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await props.params;
    const page = source.getPage(slug) as { data: PageData; url: string } | undefined;
    if (!page) {
        // Most projects have no root "index" doc — bounce `/` to the first
        // item in the sidebar instead of 404ing.
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
                        a: createRelativeLink(source, page as never),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    const params = source.generateParams() as { slug?: string[] }[];
    // No root "index" doc means generateParams() never produces the bare `/`
    // path — add it explicitly so the redirect above actually gets
    // prerendered as a static file instead of 404ing in the static export.
    const hasRoot = params.some((p) => !p.slug || p.slug.length === 0);
    if (!hasRoot) params.push({ slug: undefined });
    return params;
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const { slug } = await props.params;
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
