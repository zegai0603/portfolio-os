"use client";

import { useState } from "react";
import { GitBranch, AlertCircle, AlertTriangle, Sparkles, Lock } from "lucide-react";
import { config } from "@/lib/config";

interface StatusBarProps {
    currentPath: string;
    onToggleProblems: () => void;
    onToggleCopilot: () => void;
    problemsOpen: boolean;
}

// Map file extensions/paths to language names
const getLanguageFromPath = (path: string): string => {
    if (path.includes("preview") || path.includes("Preview")) return "React JSX";
    if (path.endsWith(".md")) return "Markdown";
    if (path.endsWith(".py")) return "Python";
    if (path.endsWith(".json")) return "JSON";
    if (path.endsWith(".ts") || path.endsWith(".tsx")) return "TypeScript";
    if (path.endsWith(".js") || path.endsWith(".jsx")) return "JavaScript";
    if (path.endsWith(".css")) return "CSS";
    if (path.endsWith(".html")) return "HTML";

    // Fallback based on route
    const routeMap: Record<string, string> = {
        "/": "Markdown",
        "/intro": "Python",
        "/projects": "JSON",
        "/skills": "TypeScript",
        "/contact": "Markdown",
        "/blog": "Markdown",
        "/frontend/preview": "React JSX",
    };

    return routeMap[path] || "Plain Text";
};

// Quirky programming problems/jokes
const QUIRKY_PROBLEMS = [
    { type: "warning", message: "Insufficient caffeine intake detected today" },
    { type: "error", message: "Semicolon anxiety detected in line 42" },
    { type: "info", message: "Remember to hydrate - water.drink() recommended" },
    { type: "warning", message: "Stack overflow: Too many browser tabs open" },
    { type: "error", message: "undefined is not a function (it's a lifestyle)" },
    { type: "info", message: "git commit -m 'I have no idea why this works'" },
    { type: "warning", message: "Warning: Works on my machine" },
    { type: "error", message: "Error 418: I'm a teapot, not a coffee machine" },
];

interface LineEndingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LineEndingModal({ isOpen, onClose }: LineEndingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70" />
            <div
                className="relative bg-vscode-sidebar border border-vscode-border rounded shadow-xl min-w-[300px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-4 py-3 border-b border-vscode-border bg-vscode-bg">
                    <span className="text-sm text-vscode-text font-medium">Select End of Line Sequence</span>
                </div>
                <div className="py-2 bg-vscode-sidebar">
                    {/* LF - Locked */}
                    <div
                        className="px-4 py-2 flex items-center justify-between cursor-not-allowed opacity-60"
                        title="Windows is superior. LF is locked."
                    >
                        <div className="flex items-center gap-2">
                            <Lock size={12} className="text-vscode-text-muted" />
                            <span className="text-sm text-vscode-text-muted">LF</span>
                        </div>
                        <span className="text-xs text-vscode-text-muted">Unix/macOS (locked)</span>
                    </div>
                    {/* CRLF - Selected */}
                    <div className="px-4 py-2 bg-vscode-active/20 flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-vscode-text font-medium">CRLF</span>
                        <span className="text-xs text-vscode-active">Windows</span>
                    </div>
                </div>
                <div className="px-4 py-3 border-t border-vscode-border bg-vscode-bg">
                    <p className="text-xs text-vscode-text-muted text-center">
                        Windows is superior. LF is locked.
                    </p>
                </div>
            </div>
        </div>
    );
}

export function StatusBar({ currentPath, onToggleProblems, onToggleCopilot, problemsOpen }: StatusBarProps) {
    const [lineEndingModalOpen, setLineEndingModalOpen] = useState(false);

    const language = getLanguageFromPath(currentPath);
    const errorCount = QUIRKY_PROBLEMS.filter(p => p.type === "error").length;
    const warningCount = QUIRKY_PROBLEMS.filter(p => p.type === "warning").length;

    const handleGitBranchClick = () => {
        if (config.github) {
            window.open(config.github, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <>
            <div className="h-6 bg-vscode-active flex items-center justify-between px-3 text-xs text-white">
                <div className="flex items-center gap-4">
                    {/* Git Branch - Clickable */}
                    <button
                        onClick={handleGitBranchClick}
                        className="flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded transition-colors cursor-pointer"
                        title="Open GitHub Repository"
                    >
                        <GitBranch size={12} />
                        <span>main</span>
                    </button>

                    {/* Problems Counter - Clickable */}
                    <button
                        onClick={onToggleProblems}
                        className={`flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded transition-colors ${problemsOpen ? 'bg-white/10' : ''}`}
                        title="View Problems"
                    >
                        <>
                            <AlertCircle size={12} className={errorCount > 0 ? "text-red-300" : ""} />
                            <span className={errorCount > 0 ? "text-red-300" : ""}>{errorCount}</span>
                            <AlertTriangle size={12} className={warningCount > 0 ? "text-yellow-300" : ""} />
                            <span className={warningCount > 0 ? "text-yellow-300" : ""}>{warningCount}</span>
                        </>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {/* CRLF - Clickable Modal */}
                    <button
                        onClick={() => setLineEndingModalOpen(true)}
                        className="hover:bg-white/10 px-1 py-0.5 rounded transition-colors"
                        title="Select End of Line Sequence"
                    >
                        CRLF
                    </button>

                    {/* Language - Dynamic */}
                    <span>{language}</span>

                    {/* Copilot Icon */}
                    <button
                        onClick={onToggleCopilot}
                        className="flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded transition-colors"
                        title="Toggle Copilot"
                    >
                        <Sparkles size={12} />
                    </button>
                </div>
            </div>

            <LineEndingModal
                isOpen={lineEndingModalOpen}
                onClose={() => setLineEndingModalOpen(false)}
            />
        </>
    );
}

export { QUIRKY_PROBLEMS };
