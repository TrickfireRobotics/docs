const RIBBONS: Record<string, { text: string; className: string }> = {
    cli: { text: "CLI DEV", className: "bg-fd-primary text-black" },
    site: { text: "SITE DEV", className: "bg-[var(--tf-pink)] text-white" },
};

export function DevRibbon() {
    const ribbon = RIBBONS[process.env.DOCS_DEV_MODE ?? ""];
    if (!ribbon) return null;

    return (
        <div className="pointer-events-none fixed top-0 left-0 z-50 h-32 w-32 overflow-hidden">
            <span
                className={`tf-heading absolute top-8 left-[-38px] w-[170px] -rotate-45 py-1 text-center text-xs tracking-wider ${ribbon.className}`}
            >
                {ribbon.text}
            </span>
        </div>
    );
}
