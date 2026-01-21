"use client";

import { X, FileCode, FileJson, FileType, FileText, File } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface Tab {
    name: string;
    path: string;
    icon?: string;
}

interface TabBarProps {
    tabs: Tab[];
    onCloseTab: (path: string) => void;
}

// File extension to icon color mapping
const getTabIcon = (name: string): React.ReactNode => {
    if (name.endsWith(".py")) return <FileCode size={14} className="text-yellow-400" />;
    if (name.endsWith(".json")) return <FileJson size={14} className="text-yellow-500" />;
    if (name.endsWith(".ts") || name.endsWith(".tsx")) return <FileType size={14} className="text-blue-400" />;
    if (name.endsWith(".md")) return <FileText size={14} className="text-blue-300" />;
    if (name.endsWith(".js") || name.endsWith(".jsx")) return <FileCode size={14} className="text-yellow-300" />;
    return <File size={14} className="text-vscode-text" />;
};

export function TabBar({ tabs, onCloseTab }: TabBarProps) {
    const router = useRouter();
    const pathname = usePathname();

    if (tabs.length === 0) {
        return (
            <div className="h-9 bg-vscode-tab-inactive-bg border-b border-vscode-border" />
        );
    }

    return (
        <div className="h-9 bg-vscode-tab-inactive-bg border-b border-vscode-border flex overflow-x-auto">
            {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                    <div
                        key={tab.path}
                        className={cn(
                            "editor-tab group",
                            isActive && "active"
                        )}
                        onClick={() => router.push(tab.path)}
                    >
                        <span className="text-base">{getTabIcon(tab.name)}</span>
                        <span className="truncate max-w-32">{tab.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCloseTab(tab.path);
                            }}
                            className="opacity-0 group-hover:opacity-100 hover:bg-vscode-border rounded p-0.5 transition-opacity"
                        >
                            <X size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
