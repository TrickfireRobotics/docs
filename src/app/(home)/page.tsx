import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { repos } from "@/lib/source";
import { resolveProjectIcon } from "@/lib/icon";
import { GradientRule } from "@/components/brand/gradient-rule";
import { WordmarkField } from "@/components/brand/wordmark-field";

export default function HomePage() {
    return (
        <>
            <main className="relative flex-1 overflow-hidden">
                <WordmarkField />

                <section className="relative px-6 pb-14 pt-20 text-center">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/logo.png"
                            alt="TrickFire Robotics"
                            width={80}
                            height={148}
                            priority
                            className="mb-7"
                        />
                        <h1 className="tf-glitch text-5xl sm:text-7xl">TrickFire Robotics</h1>
                        <p className="mt-6 max-w-md text-balance leading-relaxed text-fd-muted-foreground">
                            Documentation and guides for technologies and repositories TrickFire
                            uses.
                        </p>
                    </div>
                </section>

                <div className="relative mx-auto max-w-6xl px-6">
                    <GradientRule />
                </div>

                <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-12">
                    <div className="flex flex-wrap justify-center gap-5 [&>*]:min-w-0 [&>*]:basis-full sm:[&>*]:basis-[calc((100%-1.25rem)/2)] lg:[&>*]:basis-[calc((100%-2.5rem)/3)]">
                        {repos.map((repo) => (
                            <Link
                                key={repo.id}
                                href={`/${repo.id}`}
                                className="group tf-panel tf-lift flex flex-col gap-2 border border-fd-border bg-fd-card px-4 py-3.5"
                            >
                                <span className="flex items-center gap-3">
                                    {/* green reads as an outline at rest and fills on hover -
                                        seven solid #00FE00 blocks at once is a lot of shouting */}
                                    <span className="flex size-8 shrink-0 items-center justify-center border border-fd-primary/60 text-fd-primary transition-colors duration-150 group-hover:bg-fd-primary group-hover:text-black">
                                        {resolveProjectIcon(repo.icon, "size-4")}
                                    </span>
                                    <span className="tf-heading truncate text-lg text-fd-card-foreground">
                                        {repo.name}
                                    </span>
                                    <ArrowRight className="ms-auto size-4 shrink-0 text-fd-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                                </span>
                                {repo.description && (
                                    <span className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground">
                                        {repo.description}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="border-t border-fd-border">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-xs text-fd-muted-foreground sm:flex-row sm:justify-center">
                    <p>&copy; TrickFire Robotics {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    );
}
