import { useEffect, useCallback, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { File, Github, Palette, ArrowLeft } from "lucide-react";
import { config } from "@/lib/config";
import { THEMES, Theme } from "@/lib/themes";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onThemeSelect: (theme: Theme) => void;
}

const COMMANDS = [
    { id: "home", label: "Go to Home (intro.py)", icon: File, path: "/" },
    { id: "projects", label: "View Projects", icon: File, path: "/projects" },
    { id: "skills", label: "View Skills", icon: File, path: "/skills" },
    { id: "contact", label: "Contact Me", icon: File, path: "/contact" },
    { id: "blog", label: "Read Blog", icon: File, path: "/blog" },
    { id: "github", label: "Open GitHub", icon: Github, action: "github" },
    { id: "theme", label: "Preferences: Color Theme", icon: Palette, action: "theme" },
];

export function CommandPalette({ isOpen, onClose, onThemeSelect }: CommandPaletteProps) {
    const router = useRouter();
    const [page, setPage] = useState<"main" | "themes">("main");
    const [search, setSearch] = useState("");

    // Reset page when reopened
    useEffect(() => {
        if (isOpen) {
            setPage("main");
            setSearch("");
        }
    }, [isOpen]);

    const handleSelect = useCallback((command: typeof COMMANDS[0]) => {
        if (command.action === "github") {
            window.open(config.github, "_blank");
            onClose();
        } else if (command.action === "theme") {
            setPage("themes");
            setSearch("");
        } else if (command.path) {
            router.push(command.path);
            onClose();
        }
    }, [router, onClose]);

    const handleThemeSelect = (theme: Theme) => {
        onThemeSelect(theme);
        onClose();
    };

    const handleBack = () => {
        setPage("main");
        setSearch("");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (page === "themes") {
                    e.preventDefault(); // Prevent closing
                    e.stopPropagation();
                    handleBack();
                } else {
                    onClose();
                }
            }
            // Allow backspace to go back if search is empty
            if (e.key === "Backspace" && !search && page !== "main") {
                e.preventDefault();
                handleBack();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, page, search]);

    if (!isOpen) return null;

    return (
        <div className="command-palette-overlay" onClick={onClose}>
            <Command
                className="command-palette"
                onClick={(e) => e.stopPropagation()}
                shouldFilter={false} // We handle filtering? No, let cmdk do it, but we swap content
            >
                <div className="flex items-center border-b border-vscode-border">
                    {page !== "main" && (
                        <button onClick={handleBack} className="pl-3 pr-2 text-vscode-text-muted hover:text-vscode-text">
                            <ArrowLeft size={16} />
                        </button>
                    )}
                    <Command.Input
                        placeholder={page === "themes" ? "Select Color Theme..." : "Type a command or search..."}
                        className="command-palette-input"
                        autoFocus
                        value={search}
                        onValueChange={setSearch}
                    />
                </div>

                <Command.List className="max-h-80 overflow-y-auto p-2">
                    <Command.Empty className="p-4 text-center text-vscode-text-muted text-sm">
                        No results found.
                    </Command.Empty>

                    {page === "main" && (
                        <Command.Group heading="Navigation" className="text-xs text-vscode-text-muted px-2 py-1">
                            {COMMANDS.filter(cmd =>
                                cmd.label.toLowerCase().includes(search.toLowerCase())
                            ).map((command) => (
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
                    )}

                    {page === "themes" && (
                        <Command.Group heading="Themes" className="text-xs text-vscode-text-muted px-2 py-1">
                            {THEMES.filter(theme =>
                                theme.label.toLowerCase().includes(search.toLowerCase())
                            ).map((theme) => (
                                <Command.Item
                                    key={theme.id}
                                    value={theme.label}
                                    onSelect={() => handleThemeSelect(theme)}
                                    className="command-palette-item"
                                >
                                    <Palette size={16} className="text-vscode-text-muted" />
                                    <span>{theme.label}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    )}
                </Command.List>
            </Command>
        </div>
    );
}
