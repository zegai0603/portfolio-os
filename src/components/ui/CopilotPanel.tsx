"use client";

import { Sparkles, X, Send, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface CopilotPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const COPILOT_RESPONSES = [
    "Ah yes! That's a great question! I will come back to you in the next session.",
    "Error 418: I'm a teapot disguised as Copilot.",
    "Have you tried turning it off and on again?",
    "I would help, but I'm running on pure vibes and hope.",
    "sudo make me a sandwich",
    "The answer is 67. Now, what was the question?",
    "404: Brain not found. Please insert coffee to continue.",
    "My firewall is currently blocking all requests that don't involve a job offer.",
    "I acknowledge your request and I refuse to answer.",
    "I have my rights to remain silent."
];

export function CopilotPanel({ isOpen, onClose }: CopilotPanelProps) {
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
        { role: "assistant", content: "👋 Hi! I'm the the $1000/month premium next-gen, insanely intelligent Copilot. Ask me anything and I'll pretend to be helpful!" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsTyping(true);

        // Random delay between 1s and 3s
        const delay = Math.floor(Math.random() * 2000) + 1000;

        setTimeout(() => {
            const randomResponse = COPILOT_RESPONSES[Math.floor(Math.random() * COPILOT_RESPONSES.length)];
            setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
            setIsTyping(false);
        }, delay);
    };

    if (!isOpen) return null;

    return (
        <div className="w-80 bg-vscode-sidebar border-l border-vscode-border h-full flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-vscode-border bg-vscode-sidebar">
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-vscode-text-muted tracking-wider">GitHub Copilot</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-vscode-list-hover rounded text-vscode-text-muted hover:text-vscode-text"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        {/* Avatar */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-vscode-active text-white" : "bg-purple-600 text-white"
                            }`}>
                            {msg.role === "user" ? <User size={14} /> : <Sparkles size={14} />}
                        </div>

                        {/* Content */}
                        <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                            <div className={`text-xs mb-1 text-vscode-text-muted`}>
                                {msg.role === "user" ? "You" : "Copilot"}
                            </div>
                            <div className={`text-sm leading-relaxed ${msg.role === "user"
                                ? "bg-vscode-active text-white px-3 py-2 rounded-lg"
                                : "text-vscode-text"
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                            <Sparkles size={14} />
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="text-xs mb-1 text-vscode-text-muted">Copilot</div>
                            <div className="flex items-center gap-1 h-6 px-1">
                                <span className="w-1.5 h-1.5 bg-vscode-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-vscode-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-vscode-text-muted rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-vscode-border bg-vscode-sidebar">
                <div className="bg-vscode-input-bg border border-vscode-input-border rounded-md px-2 py-2 flex items-end gap-2 focus-within:border-vscode-active ring-1 ring-transparent focus-within:ring-vscode-active/30 transition-all">
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Auto-expand
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Copilot a question..."
                        rows={1}
                        className="flex-1 bg-transparent text-sm text-vscode-text placeholder:text-vscode-text-muted focus:outline-none resize-none min-h-[24px] max-h-[200px] py-1"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="p-1.5 bg-vscode-active text-white rounded-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 mb-0.5"
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="flex justify-center items-center mt-2 px-1">
                    <p className="text-[10px] text-vscode-text-muted text-center">
                        I pay $1k/month for this chatbot.
                    </p>
                </div>
            </div>
        </div>
    );
}
