"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ActivityBar } from "./ui/ActivityBar";
import { Sidebar } from "./ui/Sidebar";
import { TabBar, Tab } from "./ui/TabBar";
import { Terminal } from "./ui/Terminal";
import { CommandPalette } from "./ui/CommandPalette";
import { StatusBar } from "./ui/StatusBar";
import { CopilotPanel } from "./ui/CopilotPanel";
import { MenuBar } from "./ui/MenuBar";
import { Command } from "lucide-react";
import { config } from "@/lib/config";
import { Theme, DEFAULT_THEME } from "@/lib/themes";

// Map paths to tab names
const PATH_TO_TAB: Record<string, string> = {
    "/": "README.md",
    "/projects": "projects.json",
    "/skills": "skills.ts",
    "/contact": "contact.md",
    "/blog": "blog/",
    "/frontend/preview": "Preview",
};


interface VSCodeShellProps {
    children: React.ReactNode;
}

export function VSCodeShell({ children }: VSCodeShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeView, setActiveView] = useState("files");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openTabs, setOpenTabs] = useState<Tab[]>([]);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [copilotOpen, setCopilotOpen] = useState(false);
    const [bottomPanelTab, setBottomPanelTab] = useState<"terminal" | "problems">("terminal");
    const [activeTheme, setActiveTheme] = useState<Theme>(DEFAULT_THEME);

    // Apply active theme
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(activeTheme.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [activeTheme]);

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

            return [...prev, { name: tabName, path: pathname }];
        });
    }, [pathname]);

    const handleCloseTab = useCallback((path: string) => {
        // Compute navigation target BEFORE setState to avoid calling router.push during render
        let nextPath: string | null = null;

        setOpenTabs((prev) => {
            const newTabs = prev.filter((t) => t.path !== path);
            const tabIndex = prev.findIndex((t) => t.path === path);

            // If we closed the active tab, determine where to navigate
            if (path === pathname && newTabs.length > 0) {
                const nextIndex = Math.min(tabIndex, newTabs.length - 1);
                nextPath = newTabs[nextIndex].path;
            }

            return newTabs;
        });

        // Navigate AFTER the state update (outside the setState callback)
        if (nextPath) {
            router.push(nextPath);
        }
    }, [pathname, router]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K - Command palette
            if ((e.metaKey || e.ctrlKey) && e.key === "p") {
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
        if (view === "settings") {
            setCommandPaletteOpen(true);
            // Ideally we could pass a flag to open themes directly, 
            // but for now opening palette is fine as per plan.
            return;
        }

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
                <div className="flex-1 flex overflow-hidden min-w-0">
                    <div className="flex-1 flex flex-col overflow-hidden">
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
                                        <div className="flex items-center gap-8 justify-between">
                                            <span>Toggle Sidebar</span>
                                            <span className="font-mono text-xs bg-vscode-tab-inactive-bg px-1 rounded">Ctrl+B</span>
                                        </div>
                                        <div className="flex items-center gap-8 justify-between">
                                            <span>Toggle Command Palette</span>
                                            <span className="font-mono text-xs bg-vscode-tab-inactive-bg px-1 rounded">Ctrl+P</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terminal - Now inside editor area */}
                        <Terminal
                            isOpen={terminalOpen}
                            onToggle={() => setTerminalOpen(!terminalOpen)}
                            activeTab={bottomPanelTab}
                            onTabChange={setBottomPanelTab}
                        />
                    </div>

                    {/* Copilot Panel - Right Side */}
                    <CopilotPanel isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
                </div>
            </div>

            {/* Command Palette */}
            <CommandPalette
                isOpen={commandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
                onThemeSelect={setActiveTheme}
            />

            {/* Status Bar */}
            <StatusBar
                currentPath={pathname}
                onToggleProblems={() => {
                    setTerminalOpen(true);
                    setBottomPanelTab("problems");
                }}
                onToggleCopilot={() => setCopilotOpen(prev => !prev)}
                problemsOpen={terminalOpen && bottomPanelTab === "problems"}
            />
        </div>

    );
}

