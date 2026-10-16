"use client";
import Link from "next/link";
import { House } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// Fumadocs' docs-layout sidebar renders `nav.title` as a component
// (`jsx(slots.navTitle, { className })`), so this has to be a component
// reference, not an already-instantiated element - and it needs "use client"
// so Next can pass the reference across the server -> client layout boundary.
//
// The wordmark was never drawn to hold up at 24px, so the slot takes a home
// icon instead, matching the sidebar's collapse toggle exactly: same ghost
// button, same `icon-sm` sizing, same muted foreground.
export function NavTitle({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            aria-label="Home"
            className={cn(
                buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                    className: "text-fd-muted-foreground",
                }),
                className
            )}
        >
            <House />
        </Link>
    );
}
