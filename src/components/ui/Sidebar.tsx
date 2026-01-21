"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileTree } from "./FileTree";
import { config } from "@/lib/config";
import { searchFiles, type FileResult } from "@/lib/search";
import { FILE_TREE, FileNode } from "@/lib/constants";
import { ChevronRight, ChevronDown, GitCommit, FileCode, Circle, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";

import { getComments, type Comment } from "@/lib/supabase";

interface SidebarProps {
    activeView: string;
}

// Helper to find route for a file path
function getRouteForFile(filePath: string): string {
    // DFS to find the node and get its mapped path
    // The FILE_TREE paths are the source of truth for routing

    // Normalize path to ensure it starts with /
    const targetPath = filePath.startsWith("/") ? filePath : `/${filePath}`;

    // Handle specific hardcoded cases or pattern matching if needed
    // But first try to find exact match in FILE_TREE

    let foundPath: string | null = null;

    function traverse(nodes: FileNode[]) {
        if (foundPath) return; // Stop if found

        for (const node of nodes) {
            // Check if this node matches the file path
            // content.ts keys might look like "/intro.py" or "/frontend/App.tsx"
            // FILE_TREE node.path for files: "/intro.py" (for root files) or "/frontend/app" (for mapped routes)

            // We need to match based on the file NAME or expected content path.
            // content.ts uses exact file paths e.g. "/frontend/App.tsx".
            // FILE_TREE uses logical routes for frontend e.g. "/frontend/app".

            // Strategy: Check if the end of the file path matches the node name?
            // Or construct the file path from the tree?

            // Simpler: Just rely on the search result `file` which IS the key from `getAllSearchableContent`.
            // We need to map that `file` string to a route.

            // If the search result file is "/intro.py", we want corresponding route.
            // In FILE_TREE, "intro.py" has path "/".

            // If search result is "/frontend/App.tsx", we want route.
            // In FILE_TREE, "App.tsx" has path "/frontend/app".

            const nodeFileName = node.name;
            const searchFileName = targetPath.split("/").pop(); // Get basename of search result

            if (node.type === "file" && nodeFileName === searchFileName) {
                // Potential match. 
                // For simplicity, let's assume unique filenames for now or close enough context.
                // Improve: Check parent folder if needed.
                foundPath = node.path;
                return;
            }

            if (node.children) {
                traverse(node.children);
            }
        }
    }

    traverse(FILE_TREE);

    // Fallback: if no match found in tree, return original path or root
    return foundPath || targetPath;
}

export function Sidebar({ activeView }: SidebarProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<FileResult[]>([]);
    const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fileTree, setFileTree] = useState<FileNode[]>(FILE_TREE);

    // Fetch blog posts and update file tree
    useEffect(() => {
        // Find existing blog nodes to avoid duplication if effect runs twice (though setting from constant resets it)
        // We'll just fetch and update.
        import("@/lib/supabase").then(({ getBlogPosts }) => {
            getBlogPosts().then(({ data }) => {
                if (data) {
                    setFileTree(prevTree => {
                        // Deep clone to avoid mutating constant if we were modifying it directly (though strictly we are replacing state)
                        const newTree = JSON.parse(JSON.stringify(prevTree));

                        // Helper to find and update blog folder
                        const updateBlogFolder = (nodes: FileNode[]) => {
                            for (const node of nodes) {
                                if (node.name === "blog" && node.type === "folder") {
                                    node.children = data.map(post => ({
                                        name: `${post.slug}.md`, // Show as .md file
                                        type: "file",
                                        path: `/blog/${post.slug}`,
                                        icon: "markdown"
                                    }));
                                    return true;
                                }
                                if (node.children) {
                                    if (updateBlogFolder(node.children)) return true;
                                }
                            }
                            return false;
                        };

                        updateBlogFolder(newTree);
                        return newTree;
                    });
                }
            });
        });
    }, []);

    const fetchComments = useCallback(() => {
        setIsLoading(true);
        getComments().then(({ data, error }) => {
            if (data) {
                setComments(data);
            }
            setIsLoading(false);
        });
    }, []);

    // Fetch comments when view changes to "comments"
    useEffect(() => {
        if (activeView === "comments") {
            fetchComments();
        }
    }, [activeView, fetchComments]);

    // Listen for custom git-commit event for real-time updates
    useEffect(() => {
        const handleGitCommit = () => {
            fetchComments();
        };

        window.addEventListener("git-commit", handleGitCommit);

        return () => {
            window.removeEventListener("git-commit", handleGitCommit);
        };
    }, [fetchComments]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        const results = searchFiles(query);
        setSearchResults(results);

        // Auto-expand all results
        const newExpanded: Record<string, boolean> = {};
        results.forEach(r => { newExpanded[r.file] = true; });
        setExpandedFiles(newExpanded);
    };

    const toggleFileExpand = (file: string) => {
        setExpandedFiles(prev => ({ ...prev, [file]: !prev[file] }));
    };

    const navigateToResult = (path: string) => {
        const route = getRouteForFile(path);
        router.push(route);
    };

    const renderContent = () => {
        switch (activeView) {
            case "files":
                return (
                    <div className="flex flex-col h-full">
                        <div className="px-4 py-2 text-xs font-semibold text-vscode-text-muted uppercase tracking-wider">
                            Explorer
                        </div>
                        <div className="px-2 py-1 text-xs font-semibold text-vscode-text flex items-center gap-2">
                            <span className="uppercase">Portfolio-Terminal</span>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <FileTree data={fileTree} />
                        </div>
                    </div>
                );
            case "search":
                return (
                    <div className="flex flex-col h-full">
                        <div className="p-4 pb-2">
                            <div className="text-xs font-semibold text-vscode-text-muted uppercase tracking-wider mb-3">
                                Search
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search files..."
                                className="w-full px-3 py-2 bg-vscode-input-bg border border-vscode-input-border rounded text-sm text-vscode-text placeholder:text-vscode-text-muted focus:outline-none focus:border-vscode-active"
                                autoFocus
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto px-2">
                            {/* Results Count */}
                            {searchQuery && (
                                <div className="px-2 py-2 text-xs text-vscode-text-muted">
                                    {searchResults.length} files found
                                </div>
                            )}

                            {/* Results List */}
                            {searchResults.map((result) => (
                                <div key={result.file} className="mb-1">
                                    <div
                                        className="flex items-center gap-1 px-1 py-1 hover:bg-vscode-list-hover cursor-pointer rounded text-sm text-vscode-text"
                                        onClick={() => toggleFileExpand(result.file)}
                                    >
                                        {expandedFiles[result.file] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        <FileCode size={14} className="text-blue-400" />
                                        <span className="font-medium truncate">{result.file}</span>
                                        <span className="ml-auto text-xs text-vscode-text-muted bg-vscode-badge-bg px-1.5 rounded-full">
                                            {result.matches.length}
                                        </span>
                                    </div>

                                    {/* Line Matches */}
                                    {expandedFiles[result.file] && (
                                        <div className="ml-4">
                                            {result.matches.map((match, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group flex flex-col px-2 py-1 hover:bg-vscode-list-hover cursor-pointer rounded my-0.5"
                                                    onClick={() => navigateToResult(result.file)}
                                                >
                                                    <div className="font-mono text-xs text-vscode-text-muted truncate">
                                                        <span>{match.content}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {searchQuery && searchResults.length === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-vscode-text-muted">
                                    No results found.
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "github":
                return (
                    <div className="p-4">
                        <div className="text-xs font-semibold text-vscode-text-muted uppercase tracking-wider mb-3">
                            Source Control
                        </div>
                        <p className="text-sm text-vscode-text-muted">
                            View my GitHub repositories and contributions.
                        </p>
                        <a
                            href={config.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 px-4 py-2 bg-vscode-active text-white rounded text-sm hover:opacity-90 transition-opacity"
                        >
                            Open GitHub
                        </a>
                    </div>
                );
            case "comments":
                return (
                    <div className="flex flex-col h-full bg-vscode-sidebar">
                        <div className="p-4 pb-2">
                            <div className="text-xs font-semibold text-vscode-text-muted uppercase tracking-wider mb-3">
                                Git Log
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-2">
                                <div className="pl-4 border-l border-vscode-border ml-3 space-y-6 py-2">
                                    {comments.map((comment, idx) => (
                                        <div key={comment.id} className="relative">
                                            <div className="absolute -left-[21px] top-1 bg-vscode-sidebar">
                                                <Circle size={10} className="text-vscode-active fill-current" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-vscode-active">{comment.hash || comment.id.substring(0, 7)}</span>
                                                    <span className="text-xs text-vscode-text-muted">
                                                        {new Date(comment.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-vscode-text font-medium leading-tight">
                                                    {comment.message}
                                                </div>
                                                <div className="text-xs text-vscode-text-muted flex items-center gap-1">
                                                    <GitCommit size={12} />
                                                    {comment.username}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {comments.length === 0 && (
                                        <div className="text-sm text-vscode-text-muted italic">
                                            {isLoading ? "Fetching commits..." : "No commits yet. Use `git commit -m \"msg\"` in terminal."}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "profile":
                return (
                    <div className="p-4">
                        <div className="text-xs font-semibold text-vscode-text-muted uppercase tracking-wider mb-3">
                            Profile
                        </div>
                        <div className="space-y-3">
                            <div className="w-16 h-16 rounded-full bg-vscode-border flex items-center justify-center text-vscode-text overflow-hidden">
                                {config.avatarUrl ? (
                                    <img src={config.avatarUrl} alt={config.name} className="w-full h-full object-cover" />
                                ) : (
                                    <CircleUser size={32} />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-vscode-text">{config.name}</p>
                                <p className="text-xs text-vscode-text-muted">{config.title}</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-64 bg-vscode-sidebar border-r border-vscode-border h-full flex flex-col">
            {renderContent()}
        </div>
    );
}
