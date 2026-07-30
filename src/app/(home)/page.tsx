import Link from "next/link";
import Image from "next/image";
import { repos } from "@/lib/source";
import { resolveProjectIcon } from "@/lib/icon";

export default function HomePage() {
    return (
        <main className="flex-1">
            <section className="relative overflow-hidden border-b border-fd-border px-8 pb-20 pt-24 text-center">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% -5%, rgba(0,254,0,0.10) 0%, transparent 70%)",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="relative flex flex-col items-center">
                    <Image
                        src="/logo.png"
                        alt="TrickFire Robotics"
                        width={80}
                        height={148}
                        className="mb-7 drop-shadow-[0_0_16px_rgba(0,254,0,0.4)]"
                    />
                    <h1 className="text-4xl font-extrabold tracking-tight text-fd-foreground sm:text-5xl">
                        TrickFire Robotics
                    </h1>
                    <p className="mt-3 text-fd-muted-foreground">Project Documentation</p>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-8 py-14">
                <p className="mb-5 text-xs font-bold tracking-[0.12em] text-fd-muted-foreground uppercase">
                    Projects
                </p>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {repos.map((repo) => (
                        <Link
                            key={repo.id}
                            href={`/${repo.id}`}
                            className="group relative flex h-26 flex-col gap-1 rounded-lg border border-fd-border border-l-4 border-l-fd-primary/40 bg-fd-card px-6 py-5 transition-colors hover:border-l-fd-primary hover:bg-fd-accent/40"
                        >
                            <span className="flex shrink-0 items-center gap-2 truncate text-[0.975rem] font-semibold text-fd-card-foreground">
                                {resolveProjectIcon(repo.icon, "size-4 shrink-0 text-fd-primary")}
                                <span className="truncate">{repo.name}</span>
                            </span>
                            {repo.description && (
                                <span className="line-clamp-2 text-[0.825rem] leading-relaxed text-fd-muted-foreground">
                                    {repo.description}
                                </span>
                            )}
                            <span className="absolute top-1/2 right-4 -translate-y-1/2 translate-x-1 text-fd-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
