import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

interface OffsetFrameProps extends ComponentProps<"div"> {
    /** Shadow colour. Defaults to TrickFire Green. */
    accent?: "green" | "pink";
}

/**
 * Hard offset shadow with no blur - the brand's depth idiom, lifted from
 * `website/src/components/BoxShadowImage` and the framed rover photo on style
 * guide p.12.
 *
 * Use this anywhere a soft ambient `box-shadow` would otherwise go. Blurred
 * shadows read as generic material-design depth; the offset block reads as
 * TrickFire.
 */
export function OffsetFrame({ accent = "green", className, ...props }: OffsetFrameProps) {
    return (
        <div
            className={cn(
                "tf-offset-frame",
                accent === "pink" && "tf-offset-frame--pink",
                className
            )}
            {...props}
        />
    );
}
