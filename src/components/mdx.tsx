import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab as TabBase, Tabs as TabsBase } from "fumadocs-ui/components/tabs";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { CircleCheck, CircleX, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

function Tabs({ className, ...props }: ComponentProps<typeof TabsBase>) {
    return <TabsBase className={cn("bg-fd-card shadow-md", className)} {...props} />;
}

function Tab({ className, ...props }: ComponentProps<typeof TabBase>) {
    return <TabBase className={cn("bg-fd-card", className)} {...props} />;
}

type CalloutType = "info" | "warning" | "error" | "success" | "idea";

const calloutIcons: Record<CalloutType, ReactNode> = {
    info: <Info className="size-5 shrink-0 fill-(--callout-color) text-fd-card" />,
    warning: <TriangleAlert className="size-5 shrink-0 fill-(--callout-color) text-fd-card" />,
    error: <CircleX className="size-5 shrink-0 fill-(--callout-color) text-fd-card" />,
    success: <CircleCheck className="size-5 shrink-0 fill-(--callout-color) text-fd-card" />,
    idea: <Lightbulb className="size-5 shrink-0 fill-(--callout-color) text-(--callout-color)" />,
};

function resolveCalloutType(type: string): CalloutType {
    if (type === "warn") return "warning";
    if (type === "tip") return "info";
    return type as CalloutType;
}

interface CalloutProps {
    type?: string;
    icon?: ReactNode;
    title?: ReactNode;
    children?: ReactNode;
    className?: string;
}

function Callout({
    type: inputType = "info",
    icon,
    title,
    children,
    className,
    ...props
}: CalloutProps) {
    const type = resolveCalloutType(inputType);
    const iconEl = icon ?? calloutIcons[type];

    return (
        <div
            className={cn(
                "flex flex-col gap-2 my-4 rounded-xl border border-(--callout-color)/50 bg-fd-card p-3 text-sm text-fd-card-foreground shadow-md",
                className
            )}
            style={
                {
                    "--callout-color": `var(--color-fd-${type}, var(--color-fd-muted))`,
                } as CSSProperties
            }
            {...props}
        >
            {title ? (
                <>
                    <p className="flex items-center gap-2 font-medium my-0!">
                        {iconEl}
                        {title}
                    </p>
                    <div className="text-fd-muted-foreground prose-no-margin empty:hidden">
                        {children}
                    </div>
                </>
            ) : (
                <div className="flex gap-2">
                    {iconEl}
                    <div className="min-w-0 flex-1 text-fd-muted-foreground prose-no-margin empty:hidden">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

export function getMDXComponents(components?: MDXComponents) {
    return {
        ...defaultMdxComponents,
        Step,
        Steps,
        Tab,
        Tabs,
        Accordion,
        Accordions,
        Callout,
        ...components,
    } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
    type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
