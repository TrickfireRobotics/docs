import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

interface RepoMeta {
    id: string;
    name: string;
    description: string;
    firstDocId?: string;
}

interface FrameworkMeta {
    name: string;
    description: string;
    routeBasePath: string;
}

function toTitleCase(value: string): string {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

type ProjectEntry = { id: string; name: string; description: string; to: string };

export default function Home(): React.JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const repoMeta = (siteConfig.customFields?.repoMeta as RepoMeta[]) ?? [];
    const generalMeta = siteConfig.customFields?.generalMeta as RepoMeta | undefined;
    const frameworkMeta = siteConfig.customFields?.frameworkMeta as FrameworkMeta | undefined;

    const isEmpty = repoMeta.length === 0 && !generalMeta && !frameworkMeta;

    const toProjectEntry = ({ id, name, description, firstDocId }: RepoMeta): ProjectEntry => ({
        id,
        name,
        description,
        to: firstDocId ? `/${id}/${firstDocId}/` : `/${id}/`,
    });

    const allProjects: ProjectEntry[] = [
        ...(generalMeta ? [toProjectEntry(generalMeta)] : []),
        ...(frameworkMeta
            ? [
                  {
                      id: "framework",
                      name: frameworkMeta.name,
                      description: frameworkMeta.description,
                      to: `/${frameworkMeta.routeBasePath}/`,
                  },
              ]
            : []),
        ...repoMeta.map(toProjectEntry),
    ];

    return (
        <Layout title="Home" description={siteConfig.tagline}>
            <main>
                <section className={styles.hero}>
                    <div className={styles.heroGlow} aria-hidden="true" />
                    <div className={styles.dots} aria-hidden="true" />
                    <div className={styles.heroContent}>
                        <img src="/logo.png" alt="TrickFire Robotics" className={styles.heroLogo} />
                        <h1 className={styles.heroTitle}>TrickFire Robotics</h1>
                        <p className={styles.heroTagline}>Project Documentation</p>
                    </div>
                </section>

                {isEmpty ? (
                    <div className={styles.emptyState}>
                        <p>No documentation has been synced yet.</p>
                    </div>
                ) : (
                    <section className={styles.projects}>
                        <div className={styles.projectsInner}>
                            <p className={styles.sectionLabel}>Projects</p>
                            <div className={styles.grid}>
                                {allProjects.map(({ id, name, description, to }) => (
                                    <Link key={id} className={styles.card} to={to}>
                                        <span className={styles.cardName}>{toTitleCase(name)}</span>
                                        {description && (
                                            <span className={styles.cardDesc}>{description}</span>
                                        )}
                                        <span className={styles.cardArrow} aria-hidden="true">
                                            →
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}
