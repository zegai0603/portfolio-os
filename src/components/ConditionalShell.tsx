"use client";

import { usePathname } from "next/navigation";
import { VSCodeShell } from "./VSCodeShell";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Skip VSCodeShell for preview routes
    if (pathname === "/preview" || pathname.startsWith("/preview/")) {
        return <>{children}</>;
    }

    return <VSCodeShell>{children}</VSCodeShell>;
}
