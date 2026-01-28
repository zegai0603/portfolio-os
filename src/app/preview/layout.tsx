import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "zk's portfolio",
    description: "Portfolio preview mode",
};

export default function PreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // No VSCodeShell wrapper - direct full-screen preview
    return <>{children}</>;
}
