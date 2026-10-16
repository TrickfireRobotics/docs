import { cn } from "@/lib/cn";

const WORDMARK = "TRICKFIRE";

/** Enough repeats to overrun the widest viewport at the largest clamp size. */
const REPEATS = 6;

interface WordmarkFieldProps {
    /** Number of wordmark rows to render. Defaults to `8`. */
    rows?: number;
    className?: string;
}

/**
 * The background text field from style guide p.12: giant Barlow Condensed
 * italic bold `TRICKFIRE`, repeated edge to edge, rotated by one letter each
 * row so the columns never line up into a visible grid.
 *
 * This is the brand's way of filling an otherwise empty hero. It replaces the
 * dot-matrix-plus-radial-glow treatment, which is generic to every current
 * site template and appears nowhere in TrickFire's own material.
 */
export function WordmarkField({ rows = 8, className }: WordmarkFieldProps) {
    return (
        <div
            aria-hidden
            className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        >
            {Array.from({ length: rows }, (_, row) => {
                // shift the start by one letter per row, per the guide's example
                const offset = row % WORDMARK.length;
                const shifted = WORDMARK.slice(offset) + WORDMARK.slice(0, offset);
                return (
                    <div key={row} className="tf-wordmark-field">
                        {shifted.repeat(REPEATS)}
                    </div>
                );
            })}
        </div>
    );
}
