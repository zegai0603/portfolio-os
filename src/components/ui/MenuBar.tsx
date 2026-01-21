import { Terminal, LayoutPanelTop, File, Edit, View, MonitorPlay, HelpCircle, SquareTerminal } from "lucide-react";

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

            {/* Window Controls Removed */}
        </div>
    );
}
