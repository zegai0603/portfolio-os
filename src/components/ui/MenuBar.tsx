import { Terminal, LayoutPanelTop, File, Edit, View, MonitorPlay, HelpCircle, SquareTerminal, Eye } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
    onToggleTerminal: () => void;
}

export function MenuBar({ onToggleTerminal }: MenuBarProps) {
    const menuItems = [
        { label: "Terminal", action: onToggleTerminal },
    ];

    return (
        <div className="h-8 bg-vscode-sidebar border-b border-vscode-border flex items-center px-2 select-none z-50">
            <div className="flex items-center">
                {/* VS Code Icon */}
                <div className="mr-4 px-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                        <SquareTerminal size={14} className="text-white" />
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex items-center">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className={`px-3 py-1 text-xs text-vscode-text-muted hover:bg-vscode-bg hover:text-vscode-text rounded-sm transition-colors ${!item.action ? "cursor-default opacity-80" : "cursor-pointer"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Title (Centred - optional, maybe just keep it simple) */}
            <div className="flex-1 text-center text-xs text-vscode-text-muted opacity-60">
                Portfolio Terminal
            </div>

            {/* Preview Mode Button with Rainbow Border */}
            <Link
                href="/preview"
                className="preview-rainbow-btn flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all mr-2"
                title="View Portfolio (Non-Dev Mode)"
            >
                <Eye size={14} />
                <span>Portfolio</span>
            </Link>

            {/* Rainbow border animation styles */}
            <style jsx global>{`
                .preview-rainbow-btn {
                    border: 2px solid #ffffff;
                    color: #d4d4d4;
                    background: rgba(30, 30, 30, 0.8);
                    transition: transform 150ms, box-shadow 150ms;
                }
                
                .preview-rainbow-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                    color: #ffffff;
                }
                
                @media (prefers-color-scheme: light) {
                    .preview-rainbow-btn {
                        border-color: #000000;
                        color: #333333;
                        background: rgba(255, 255, 255, 0.9);
                    }
                    
                    .preview-rainbow-btn:hover {
                        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
                        color: #000000;
                    }
                }
            `}</style>

            {/* Window Controls Removed */}
        </div>
    );
}

