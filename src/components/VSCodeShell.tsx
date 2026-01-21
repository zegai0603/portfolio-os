"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ActivityBar } from "./ui/ActivityBar";
import { Sidebar } from "./ui/Sidebar";
import { TabBar, Tab } from "./ui/TabBar";
import { Terminal } from "./ui/Terminal";
import { CommandPalette } from "./ui/CommandPalette";
import { Command } from "lucide-react";
import { config } from "@/lib/config";

const PATH_TO_TAB: Record<string, string> = {
    "/": "README.md",
    "/intro": "intro.py",
    "/projects": "projects.json",
    "/skills": "skills.ts",
    "/contact": "contact.md",
    "/blog": "blog/",
    "/frontend/preview": "Preview",
};


interface VSCodeShellProps {
    children: React.ReactNode;
}

import { MenuBar } from "./ui/MenuBar";

export function VSCodeShell({ children }: VSCodeShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeView, setActiveView] = useState("files");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openTabs, setOpenTabs] = useState<Tab[]>([]);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

    // Track if we specifically closed everything to show empty state
    // We can infer this: if openTabs is empty, show empty state.
    // BUT specific edge case: Initial load with 0 tabs? 
    // Usually initial load has pathname, so we add tab.

    // Add tab when navigating
    useEffect(() => {
        const tabName = PATH_TO_TAB[pathname] || pathname.split("/").pop() || "untitled";

        setOpenTabs((prev) => {
            const existingTab = prev.find((t) => t.path === pathname);
            // If tab exists, just return prev
            if (existingTab) {
                return prev;
            }
            // If no tabs exist, and we just landed (e.g. reload), we add it.
            // But if we just closed the last tab, we don't want to re-add it immediately?
            // The `handleCloseTab` logic manages navigation.
            // If I close last tab, I want to stay on a "null" route? 
            // Changing route re-triggers this effect.
            // We should filter this effect: Only add if standard navigation occurred?
            // Actually, if I close the last tab, I won't navigate. But pathname is still there.

            // Fix: If we currently have 0 tabs, and we are NOT in a "just closed everything" state... 
            // It's tricky.
            // Simplify: Let's assume if we manually closed tabs, we want it empty.
            // But if user clicks sidebar, they navigate, triggering pathname change.

            return [...prev, { name: tabName, path: pathname }];
        });
    }, [pathname]);

    const handleCloseTab = useCallback((path: string) => {
        setOpenTabs((prev) => {
            const newTabs = prev.filter((t) => t.path !== path);
            const tabIndex = prev.findIndex((t) => t.path === path);

            // If we closed the active tab
            if (path === pathname) {
                if (newTabs.length > 0) {
                    // Navigate to neighbour
                    const nextIndex = Math.min(tabIndex, newTabs.length - 1);
                    const nextTab = newTabs[nextIndex];
                    router.push(nextTab.path);
                } else {
                    // We closed the last tab.
                    // Do NOT navigate. 
                    // We will just render the empty state.
                    // But `useEffect` above might re-add it because `pathname` hasn't changed?
                    // To get around `useEffect` dependency, we might need a ref or flag?
                    // Or simply: check if the tab is already in `openTabs` before adding?
                    // Yes, `useEffect` checks `existingTab`. But if we just removed it from state...
                    // then `useEffect` will fire again? No, useEffect fires on `pathname` change.
                    // If pathname DOES NOT change, effect doesn't fire.
                    // So we are safe provided we don't trigger navigation.
                }
            }

            return newTabs;
        });
    }, [pathname, router]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K - Command palette
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandPaletteOpen(true);
            }
            // Cmd+B - Toggle sidebar
            if ((e.metaKey || e.ctrlKey) && e.key === "b") {
                e.preventDefault();
                setSidebarOpen((prev) => !prev);
            }
            // Cmd+` - Toggle terminal
            if ((e.metaKey || e.ctrlKey) && e.key === "`") {
                e.preventDefault();
                setTerminalOpen((prev) => !prev);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Toggle sidebar when clicking same activity bar item
    const handleViewChange = (view: string) => {
        if (view === activeView) {
            setSidebarOpen((prev) => !prev);
        } else {
            setActiveView(view);
            setSidebarOpen(true);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-vscode-bg overflow-hidden">
            {/* Menu Bar */}
            <MenuBar onToggleTerminal={() => setTerminalOpen(prev => !prev)} />

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Activity Bar */}
                <ActivityBar activeView={activeView} onViewChange={handleViewChange} />

                {/* Sidebar - Collapsible */}
                <div
                    className={`transition-all duration-200 ease-in-out overflow-hidden ${sidebarOpen ? "w-64" : "w-0"
                        }`}
                >
                    <div className="w-64 h-full">
                        <Sidebar activeView={activeView} />
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                    {/* Tab Bar */}
                    <TabBar tabs={openTabs} onCloseTab={handleCloseTab} />

                    {/* Editor Content or Empty State */}
                    <div className="flex-1 overflow-auto bg-vscode-bg relative">
                        {openTabs.length > 0 ? (
                            children
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-vscode-text-muted opacity-50 select-none">
                                <div className="mb-4 text-vscode-text-muted">
                                    <Command size={64} />
                                </div>
                                <div className="text-sm space-y-2">
                                    <div className="flex items-center gap-8 justify-between">
                                        <span>Toggle Terminal</span>
                                        <span className="font-mono text-xs bg-vscode-tab-inactive-bg px-1 rounded">Ctrl+`</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Terminal - Now inside editor area */}
                    <Terminal isOpen={terminalOpen} onToggle={() => setTerminalOpen(!terminalOpen)} />
                </div>
            </div>

            {/* Command Palette */}
            <CommandPalette
                isOpen={commandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
            />

            {/* Status Bar */}
            <div className="h-6 bg-vscode-active flex items-center justify-between px-3 text-xs text-white">
                <div className="flex items-center gap-4">
                    <span>🔀 main</span>
                    {config.showErrorState ? (
                        <span className="flex items-center gap-1 text-red-300">
                            <span>ⓧ</span>
                            <span>1 Error</span>
                        </span>
                    ) : (
                        <span>✓ 0 Problems</span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <span>Ln 1, Col 1</span>
                    <span>UTF-8</span>
                    <span>TypeScript</span>
                </div>
            </div>
        </div>
    );
}

