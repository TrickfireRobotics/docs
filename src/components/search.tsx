"use client";
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { oramaStaticClient } from "fumadocs-core/search/client/orama-static";
import { create } from "@orama/orama";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { usePathname } from "next/navigation";

function initOrama() {
    return create({
        schema: { _: "string" },
        language: "english",
    });
}

export default function DefaultSearchDialog(props: SharedProps) {
    const { locale } = useI18n();
    const pathname = usePathname();
    const repo = pathname.split("/").filter(Boolean)[0];

    const { search, setSearch, query } = useDocsSearch({
        client: oramaStaticClient({
            initOrama,
            locale,
            from: repo ? `/api/search/${repo}` : undefined,
        }),
        delayMs: 100,
    });

    return (
        <SearchDialog
            search={search}
            onSearchChange={setSearch}
            isLoading={query.isLoading}
            {...props}
        >
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={query.data !== "empty" ? query.data : null} />
            </SearchDialogContent>
        </SearchDialog>
    );
}
