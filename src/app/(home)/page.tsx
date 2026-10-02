import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { repos } from "@/lib/source";
import { resolveProjectIcon } from "@/lib/icon";
import { ProjectGrid } from "@/components/project-grid";

const LED_CLUSTERS = [
    { x: "16%", y: 140, size: 34, delay: "0s", duration: "4s" },
    { x: "74%", y: 95, size: 30, delay: "0.8s", duration: "6s" },
    { x: "84%", y: 205, size: 28, delay: "1.4s", duration: "5.2s" },
    { x: "8%", y: 265, size: 26, delay: "1.9s", duration: "4.2s" },
    { x: "26%", y: 310, size: 24, delay: "2.3s", duration: "4.6s" },
    { x: "90%", y: 360, size: 22, delay: "3.1s", duration: "5s" },
];

export default function HomePage() {
    return (
        <>
            <main className="relative flex-1 overflow-hidden">
                <div aria-hidden className="tf-dot-grid pointer-events-none absolute inset-0" />
                <div aria-hidden className="tf-hero-glow pointer-events-none absolute inset-0" />
                {LED_CLUSTERS.map((led) => (
                    <div
                        key={`${led.x}-${led.y}`}
                        aria-hidden
                        className="tf-led-cluster pointer-events-none absolute inset-0"
                        style={{
                            maskImage: `radial-gradient(circle ${led.size}px at ${led.x} ${led.y}px, #000 0%, transparent 100%)`,
                            WebkitMaskImage: `radial-gradient(circle ${led.size}px at ${led.x} ${led.y}px, #000 0%, transparent 100%)`,
                            animationDelay: led.delay,
                            animationDuration: led.duration,
                        }}
                    />
                ))}

                <section className="relative px-6 pb-16 pt-24 text-center">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/logo.png"
                            alt="TrickFire Robotics"
                            width={80}
                            height={148}
                            className="tf-logo-glow mb-7"
                        />
                        <h1 className="bg-linear-to-b from-fd-foreground to-fd-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-6xl">
                            TrickFire Robotics
                        </h1>
                        <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
                            Documentation and guides for technologies and repositories Trickfire
                            uses.
                        </p>
                    </div>
                </section>

                <section className="relative mx-auto max-w-6xl px-6 pb-24">
                    <ProjectGrid>
                        {repos.map((repo) => (
                            <Link
                                key={repo.id}
                                href={`/${repo.id}`}
                                className="group relative flex min-h-28 flex-col gap-3 rounded-2xl border border-fd-border bg-fd-card/70 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-fd-primary/30 hover:bg-fd-card"
                            >
                                <span aria-hidden className="tf-card-glow" />
                                <span aria-hidden className="tf-card-ring" />
                                <span className="relative flex items-center gap-3">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-fd-primary/15 bg-fd-primary/10 text-fd-primary transition-colors duration-300 group-hover:bg-fd-primary/15">
                                        {resolveProjectIcon(repo.icon, "size-[1.15rem]")}
                                    </span>
                                    <span className="truncate text-[0.975rem] font-semibold text-fd-card-foreground">
                                        {repo.name}
                                    </span>
                                    <ArrowRight className="ms-auto size-4 shrink-0 text-fd-primary opacity-25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </span>
                                {repo.description && (
                                    <span className="relative line-clamp-2 text-[0.825rem] leading-relaxed text-fd-muted-foreground">
                                        {repo.description}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </ProjectGrid>
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
