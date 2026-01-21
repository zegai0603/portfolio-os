"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { FILE_TREE, FileNode } from "@/lib/constants";
import { cn } from "@/lib/utils";

// File icon colors based on extension
const FILE_ICON_COLORS: Record<string, string> = {
    python: "text-yellow-400",
    json: "text-yellow-500",
    typescript: "text-blue-400",
    markdown: "text-blue-300",
    javascript: "text-yellow-300",
};

interface FileTreeItemProps {
    node: FileNode;
    depth: number;
}

function FileTreeItem({ node, depth }: FileTreeItemProps) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const isActive = node.type === "file" && pathname === node.path;

    const handleClick = () => {
        if (node.type === "folder") {
            setIsOpen(!isOpen);
        } else {
            router.push(node.path);
        }
    };

    const iconColor = node.icon ? FILE_ICON_COLORS[node.icon] || "text-vscode-text" : "text-vscode-text";

    return (
        <div>
            <div
                onClick={handleClick}
                className={cn(
                    "file-tree-item",
                    isActive && "active"
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                {node.type === "folder" ? (
                    <>
                        {isOpen ? (
                            <ChevronDown size={16} className="text-vscode-text-muted shrink-0" />
                        ) : (
                            <ChevronRight size={16} className="text-vscode-text-muted shrink-0" />
                        )}
                        {isOpen ? (
                            <FolderOpen size={16} className="text-yellow-500 shrink-0" />
                        ) : (
                            <Folder size={16} className="text-yellow-500 shrink-0" />
                        )}
                    </>
                ) : (
                    <>
                        <span className="w-4" />
                        <File size={16} className={cn("shrink-0", iconColor)} />
                    </>
                )}
                <span className="ml-2 truncate">{node.name}</span>
            </div>
            {node.type === "folder" && isOpen && node.children && (
                <div>
                    {node.children.map((child) => (
                        <FileTreeItem key={child.name} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export interface FileTreeProps {
    data: FileNode[];
}

export function FileTree({ data }: FileTreeProps) {
    return (
        <div className="py-2">
            {data.map((node) => (
                <FileTreeItem key={node.name} node={node} depth={0} />
            ))}
        </div>
    );
}
