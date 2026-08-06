import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab as TabBase, Tabs as TabsBase } from "fumadocs-ui/components/tabs";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";

function Tabs({ className, ...props }: ComponentProps<typeof TabsBase>) {
    return <TabsBase className={cn("bg-fd-card shadow-md", className)} {...props} />;
}

function Tab({ className, ...props }: ComponentProps<typeof TabBase>) {
    return <TabBase className={cn("bg-fd-card", className)} {...props} />;
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
        ...components,
    } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
    type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
