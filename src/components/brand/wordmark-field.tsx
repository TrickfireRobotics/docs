import { cn } from "@/lib/cn";

const WORDMARK = "TRICKFIRE";

// Both counts deliberately overrun the container, which clips them. Sizing
// them to fit would mean measuring at runtime; overrunning costs a few
// thousand characters of static text and can never leave a bald corner.
//
// At the 5.8rem clamp ceiling (92.8px) Barlow Condensed italic averages
// ~0.42em per glyph, so one character is ~39px wide and one line is ~85px
// tall. 16 repeats is 144 characters, about 5600px - past 5K. 27 rows is
// about 2300px, past any portrait display, and being a multiple of 9 keeps
// the one-letter-per-row offset on a whole cycle.
const REPEATS = 16;
const DEFAULT_ROWS = 27;

interface WordmarkFieldProps {
    /** Rows to render. Defaults to a count that overruns any viewport. */
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
export function WordmarkField({ rows = DEFAULT_ROWS, className }: WordmarkFieldProps) {
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
