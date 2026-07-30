import { getSource, repoIds } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions, projectTabs } from "@/lib/layout.shared";
import { notFound } from "next/navigation";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ repo: string }>;
}) {
    const { repo } = await params;
    const source = getSource(repo);
    if (!source) notFound();

    return (
        <DocsLayout tree={source.getPageTree()} tabs={projectTabs()} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

export function generateStaticParams() {
    return repoIds.map((repo) => ({ repo }));
}
