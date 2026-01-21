"use client";

import { Files, Search, Github, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityBarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const ACTIVITY_ITEMS = [
    { id: "files", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "github", icon: Github, label: "Source Control" },
    { id: "comments", icon: MessageSquare, label: "Comments" },
];

const BOTTOM_ITEMS = [
    { id: "profile", icon: User, label: "Profile" },
];

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
    return (
        <div className="w-12 bg-vscode-activity-bar border-r border-vscode-border flex flex-col justify-between">
            <div className="flex flex-col">
                {ACTIVITY_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                            "activity-icon",
                            activeView === item.id && "active"
                        )}
                        title={item.label}
                    >
                        <item.icon size={24} />
                    </button>
                ))}
            </div>
            <div className="flex flex-col">
                {BOTTOM_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                            "activity-icon",
                            activeView === item.id && "active"
                        )}
                        title={item.label}
                    >
                        <item.icon size={24} />
                    </button>
                ))}
            </div>
        </div>
    );
}
