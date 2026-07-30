import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const registry = Icons as unknown as Record<string, LucideIcon>;

export function resolveIcon(name?: string | null, className = "size-4"): ReactNode {
    if (!name) return null;
    const Icon = registry[name];
    if (!Icon) return null;
    return <Icon className={className} />;
}

const DEFAULT_PROJECT_ICON = "FolderGit2";

/** Same as resolveIcon, but project cards/tabs always show *something* - a
 * project with no icon set (e.g. a member repo that hasn't added one yet)
 * falls back to a generic icon instead of leaving a blank slot. */
export function resolveProjectIcon(name?: string | null, className = "size-4"): ReactNode {
    return resolveIcon(name ?? DEFAULT_PROJECT_ICON, className);
}
