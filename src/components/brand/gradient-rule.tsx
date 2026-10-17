import { cn } from "@/lib/cn";

interface GradientRuleProps {
    /** Wipe the rule in from the left as it scrolls into view. Defaults to `true`. */
    reveal?: boolean;
    className?: string;
}

/**
 * Green-to-pink hairline. The brand's section divider - it rules off every page
 * of the style guide and underlines the active link in the website's navbar.
 *
 * Port of `website/src/components/GradientLine`, which drives the same wipe with
 * GSAP ScrollTrigger. Here it runs on a scroll-driven CSS animation instead, so
 * it costs no JS and degrades to a static rule where `animation-timeline` is
 * unsupported.
 */
export function GradientRule({ reveal = true, className }: GradientRuleProps) {
    return <hr className={cn("tf-rule", reveal && "tf-rule--reveal", className)} />;
}
