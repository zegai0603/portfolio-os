"use client";

import { usePathname } from "next/navigation";
import { VSCodeShell } from "./VSCodeShell";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Only use VSCodeShell for code routes
    if (pathname === "/code" || pathname.startsWith("/code/")) {
        return <VSCodeShell>{children}</VSCodeShell>;
    }

    // Default to simple layout for preview (root) and legacy preview routes
    return <>{children}</>;
}
