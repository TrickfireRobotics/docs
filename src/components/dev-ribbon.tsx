const RIBBONS: Record<string, { text: string; className: string }> = {
    cli: { text: "CLI DEV", className: "bg-amber-500 text-amber-950" },
    site: { text: "SITE DEV", className: "bg-blue-500 text-blue-950" },
};

export function DevRibbon() {
    const ribbon = RIBBONS[process.env.DOCS_DEV_MODE ?? ""];
    if (!ribbon) return null;

    return (
        <div className="pointer-events-none fixed top-0 left-0 z-50 h-32 w-32 overflow-hidden">
            <span
                className={`absolute top-8 left-[-38px] w-[170px] -rotate-45 py-1 text-center text-xs font-bold tracking-wider shadow-md ${ribbon.className}`}
            >
                {ribbon.text}
            </span>
        </div>
    );
}
