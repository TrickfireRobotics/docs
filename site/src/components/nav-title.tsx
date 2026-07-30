"use client";
import Image from "next/image";
import Link from "next/link";

// Fumadocs' docs-layout sidebar renders `nav.title` as a component
// (`jsx(slots.navTitle, { className })`), so this has to be a component
// reference, not an already-instantiated element - and it needs "use client"
// so Next can pass the reference across the server -> client layout boundary.
export function NavTitle({ className }: { className?: string }) {
    return (
        <Link href="/" className={className}>
            <Image
                src="/nav-logo.png"
                alt="TrickFire Robotics"
                width={80}
                height={30}
                className="h-6 w-auto"
                priority
            />
        </Link>
    );
}
