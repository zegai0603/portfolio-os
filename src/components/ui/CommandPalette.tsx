"use client";

import { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { File, Github } from "lucide-react";
import { config } from "@/lib/config";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

const COMMANDS = [
    { id: "home", label: "Go to Home (intro.py)", icon: File, path: "/" },
    { id: "projects", label: "View Projects", icon: File, path: "/projects" },
    { id: "skills", label: "View Skills", icon: File, path: "/skills" },
    { id: "contact", label: "Contact Me", icon: File, path: "/contact" },
    { id: "blog", label: "Read Blog", icon: File, path: "/blog" },
    { id: "github", label: "Open GitHub", icon: Github, action: "github" },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const router = useRouter();

    const handleSelect = useCallback((command: typeof COMMANDS[0]) => {
        if (command.action === "github") {
            window.open(config.github, "_blank");
        } else if (command.path) {
            router.push(command.path);
        }
        onClose();
    }, [router, onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="command-palette-overlay" onClick={onClose}>
            <Command
                className="command-palette"
                onClick={(e) => e.stopPropagation()}
            >
                <Command.Input
                    placeholder="Type a command or search..."
                    className="command-palette-input"
                    autoFocus
                />
                <Command.List className="max-h-80 overflow-y-auto p-2">
                    <Command.Empty className="p-4 text-center text-vscode-text-muted text-sm">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="text-xs text-vscode-text-muted px-2 py-1">
                        {COMMANDS.map((command) => (
                            <Command.Item
                                key={command.id}
                                value={command.label}
                                onSelect={() => handleSelect(command)}
                                className="command-palette-item"
                            >
                                <command.icon size={16} className="text-vscode-text-muted" />
                                <span>{command.label}</span>
                            </Command.Item>
                        ))}
                    </Command.Group>
                </Command.List>
            </Command>
        </div>
    );
}
