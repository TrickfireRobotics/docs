const MODES: Record<string, { label: string; className: string }> = {
    cli: { label: "CLI", className: "bg-fd-primary text-black" },
    site: { label: "SITE", className: "bg-[var(--tf-pink)] text-white" },
};

/**
 * Marks a local dev build. Deliberately tiny: a corner tab rather than the
 * old diagonal ribbon, which sat on top of the sidebar logo and was the
 * loudest thing on the page. Bottom-right stays clear of the Next.js
 * devtools button (bottom-left) and the table of contents.
 */
export function DevBadge() {
    const mode = MODES[process.env.DOCS_DEV_MODE ?? ""];
    if (!mode) return null;

    return (
        <span
            aria-hidden
            className={`tf-heading pointer-events-none fixed bottom-0 right-0 z-50 px-1.5 py-px text-[0.5625rem] leading-[1.4] tracking-[0.12em] ${mode.className}`}
        >
            {mode.label} DEV
        </span>
    );
}
