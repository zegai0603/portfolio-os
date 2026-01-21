"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronUp, X, Terminal as TerminalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { TERMINAL_COMMANDS, DIRECTORY_CONTENTS } from "@/lib/constants";

interface TerminalProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface HistoryEntry {
    id: string; // Add ID for stable updates
    command: string;
    output: string;
    isInteractive?: boolean;
    files?: { name: string; path: string }[];
}

export function Terminal({ isOpen, onToggle }: TerminalProps) {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([
        { id: "init", command: "", output: "Welcome to Portfolio Terminal. Type 'help' for available commands." }
    ]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentDir, setCurrentDir] = useState("~");
    const [height, setHeight] = useState(300); // Default height
    const [isResizing, setIsResizing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizeRef = useRef<{ startY: number; startHeight: number } | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Resizing Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !resizeRef.current) return;

            const delta = resizeRef.current.startY - e.clientY;
            const newHeight = Math.max(100, Math.min(window.innerHeight - 100, resizeRef.current.startHeight + delta));
            setHeight(newHeight);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            resizeRef.current = null;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };
    }, [isResizing]);

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        resizeRef.current = { startY: e.clientY, startHeight: height };
    };

    const getPrompt = () => `${currentDir} $`;

    const addToHistory = (command: string, output: string) => {
        setHistory(prev => [...prev, {
            id: Math.random().toString(36).substring(7),
            command,
            output
        }]);
    };

    const executeCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const lowerCmd = trimmedCmd.toLowerCase();

        // Generate ID for this command execution to allow updating the output later
        const commandId = Math.random().toString(36).substring(7);

        if (lowerCmd === "clear") {
            setHistory([]);
            return;
        }

        // pwd command
        if (lowerCmd === "pwd") {
            addToHistory(cmd, currentDir);
            return;
        }

        // ls command - show directory contents based on current dir
        if (lowerCmd === "ls") {
            const contents = DIRECTORY_CONTENTS[currentDir] || "Empty directory";
            addToHistory(cmd, contents);
            return;
        }

        // cd command - change directory
        if (lowerCmd.startsWith("cd ")) {
            const target = trimmedCmd.slice(3).trim();
            let newDir = currentDir;

            if (target === ".." || target === "../") {
                // Go up one level
                if (currentDir === "~") {
                    newDir = "~";
                } else {
                    const parts = currentDir.split("/");
                    parts.pop();
                    newDir = parts.length === 1 ? "~" : parts.join("/");
                }
            } else if (target === "~" || target === "/") {
                newDir = "~";
            } else if (target === "frontend") {
                newDir = currentDir === "~" ? "~/src/frontend" : `${currentDir}/frontend`;
            } else if (target === "src") {
                newDir = "~/src";
            } else if (target === "portfolio") {
                newDir = "~/src/portfolio";
            } else if (target === "blog") {
                newDir = "~/src/blog";
            } else if (target.startsWith("~/") || target.startsWith("src/")) {
                newDir = target.startsWith("~") ? target : `~/${target}`;
            } else {
                // Try to append to current dir
                newDir = `${currentDir}/${target}`;
            }

            // Validate directory exists
            if (DIRECTORY_CONTENTS[newDir]) {
                setCurrentDir(newDir);
                addToHistory(cmd, "");
            } else {
                addToHistory(cmd, `cd: no such directory: ${target}`);
            }
            return;
        }

        // npm run dev - launch frontend preview
        if (lowerCmd === "npm run dev" || lowerCmd === "npm start") {
            if (currentDir.includes("frontend")) {
                addToHistory(cmd, `
> portfolio-frontend@1.0.0 dev
> vite

  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help

Opening preview...`);
                // Navigate to preview after a short delay
                setTimeout(() => {
                    router.push("/frontend/preview");
                }, 500);
            } else {
                addToHistory(cmd, "npm ERR! This command must be run in the frontend directory.\nTry: cd frontend && npm run dev");
            }
            return;
        }

        // npm install
        if (lowerCmd === "npm install" || lowerCmd === "npm i") {
            if (currentDir.includes("frontend")) {
                addToHistory(cmd, `added 234 packages in 3.2s

78 packages are looking for funding
  run \`npm fund\` for details`);
            } else {
                addToHistory(cmd, "npm WARN: No package.json found in this directory");
            }
            return;
        }

        // Standard commands from constants
        let output: string;
        const handler = TERMINAL_COMMANDS[lowerCmd];

        if (handler) {
            // Initial entry saying it's executing (if async) or just result
            if (typeof handler === "function") {
                const result = handler();

                if (result instanceof Promise) {
                    setHistory(prev => [...prev, {
                        id: commandId,
                        command: cmd,
                        output: "Executing..."
                    }]);

                    try {
                        output = await result;
                        // Update the existing entry
                        setHistory(prev => prev.map(entry =>
                            entry.id === commandId ? { ...entry, output } : entry
                        ));
                    } catch (error) {
                        setHistory(prev => prev.map(entry =>
                            entry.id === commandId ? { ...entry, output: `Error: ${error}` } : entry
                        ));
                    }
                    return;
                } else {
                    output = result as string;
                }
            } else {
                output = handler as string;
            }
            addToHistory(cmd, output);
            return;
        }

        // Git commit command
        if (lowerCmd.startsWith("git commit") || lowerCmd.startsWith("git  commit")) {
            // Parse git commit -m "message" [--author "name"]
            const messageMatch = cmd.match(/-m\s+"([^"]+)"/);
            const authorMatch = cmd.match(/--author\s+"([^"]+)"/);

            if (messageMatch) {
                const message = messageMatch[1];
                const author = authorMatch ? authorMatch[1] : undefined;

                // Add initial "Committing..." entry
                setHistory(prev => [...prev, {
                    id: commandId,
                    command: cmd,
                    output: "Committing changes..."
                }]);

                try {
                    const { addComment } = await import("@/lib/supabase");
                    const { error } = await addComment(message, author);

                    if (error) throw error;

                    const successOutput = `[main ${Math.random().toString(16).substring(2, 9)}] ${message}\n 1 file changed, 1 insertion(+)`;

                    // Update the SPECIFIC entry by ID
                    setHistory(prev => prev.map(entry =>
                        entry.id === commandId ? { ...entry, output: successOutput } : entry
                    ));

                    // Trigger real-time update in Sidebar
                    window.dispatchEvent(new Event("git-commit"));

                } catch (e) {
                    console.error("Git commit error:", e);
                    const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
                    const errorOutput = `fatal: could not commit: ${errorMessage}`;

                    setHistory(prev => prev.map(entry =>
                        entry.id === commandId ? { ...entry, output: errorOutput } : entry
                    ));
                }
            } else {
                if (cmd.includes("git commit")) {
                    output = `error: switch \`m' requires a value\nusage: git commit -m <msg> [--author <name>]`;
                } else {
                    output = `git: '${trimmedCmd.split(' ')[1]}' is not a git command. See 'git --help'.`;
                }
                addToHistory(cmd, output);
            }
            return;
        }

        // Empty command
        if (lowerCmd === "") {
            // Do nothing just a new line
            return;
        }

        // Unknown Command
        output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
        addToHistory(cmd, output);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Normal command mode
        if (e.key === "Enter") {
            executeCommand(input);
            setInput("");
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const commandHistory = history.filter((h) => h.command);
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]?.command || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                const commandHistory = history.filter((h) => h.command);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]?.command || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // Auto-complete for common commands
            const suggestions = ["cd frontend", "npm run dev", "npm install", "ls", "pwd", "help", "clear", "git commit"];
            const match = suggestions.find((s) => s.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            style={{ height: `${height}px` }}
            className="bg-vscode-terminal-bg border-t border-vscode-border flex flex-col shadow-inner relative"
        >
            {/* Resize Handle */}
            <div
                className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-vscode-active/50 z-10"
                onMouseDown={handleResizeStart}
            />

            {/* Panel Tabs Header */}
            <div className="flex items-center justify-between px-4 border-b border-vscode-border bg-vscode-sidebar select-none">
                <div className="flex items-center gap-6 text-xs font-medium h-9">
                    <span className="text-vscode-text h-full flex items-center border-b-2 border-vscode-active cursor-default uppercase">Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-2 border-l border-vscode-border ml-2 text-vscode-text-muted">
                        <TerminalIcon size={14} className="text-vscode-text" />
                        <span className="text-xs">bash</span>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-1 hover:bg-vscode-bg rounded transition-colors"
                        title="Close Panel"
                    >
                        <X size={16} className="text-vscode-text-muted hover:text-vscode-text" />
                    </button>
                    <button
                        onClick={() => setHeight(height === 300 ? 500 : 300)}
                        className="p-1 hover:bg-vscode-bg rounded transition-colors"
                        title="Toggle Size"
                    >
                        <ChevronUp size={16} className="text-vscode-text-muted hover:text-vscode-text" />
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto terminal-container p-4 font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry) => (
                    <div key={entry.id} className="mb-2">
                        {entry.command && (
                            <div className="flex items-center gap-2">
                                <span className="terminal-prompt">{getPrompt()}</span>
                                <span>{entry.command}</span>
                            </div>
                        )}
                        {entry.output && (
                            <pre className="whitespace-pre-wrap text-vscode-text mt-1">{entry.output}</pre>
                        )}
                    </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center gap-2">
                    <span className="terminal-prompt">{getPrompt()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="terminal-input"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
