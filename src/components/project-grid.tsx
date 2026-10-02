"use client";
import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

function cards(grid: HTMLDivElement | null): HTMLElement[] {
    return grid ? (Array.from(grid.children) as HTMLElement[]) : [];
}

// Each card gets the pointer position in its *own* coordinate space, so the
// spotlight gradient fades out on its own for cards far from the cursor
// instead of needing a per-card hover check.
export function ProjectGrid({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const frame = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    const onMove = useCallback(({ clientX, clientY }: MouseEvent<HTMLDivElement>) => {
        if (frame.current) return;
        frame.current = requestAnimationFrame(() => {
            frame.current = 0;
            for (const card of cards(ref.current)) {
                const { left, top } = card.getBoundingClientRect();
                card.style.setProperty("--mx", `${clientX - left}px`);
                card.style.setProperty("--my", `${clientY - top}px`);
            }
        });
    }, []);

    const onLeave = useCallback(() => {
        for (const card of cards(ref.current)) {
            card.style.removeProperty("--mx");
            card.style.removeProperty("--my");
        }
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="flex flex-wrap justify-center gap-3 [&>*]:min-w-0 [&>*]:basis-full sm:[&>*]:basis-[calc((100%-0.75rem)/2)] lg:[&>*]:basis-[calc((100%-1.5rem)/3)]"
        >
            {children}
        </div>
    );
}
