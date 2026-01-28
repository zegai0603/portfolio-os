"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye, Code } from "lucide-react";

interface CodeEditorProps {
    code: string;
    language: string;
    showLineNumbers?: boolean;
}

export function CodeEditor({ code, language, showLineNumbers = true }: CodeEditorProps) {
    const isMarkdown = language === "markdown";
    const [isPreview, setIsPreview] = useState(isMarkdown);

    return (
        <div className="h-full relative bg-vscode-editor-bg">
            {/* Markdown Toggle */}
            {isMarkdown && (
                <button
                    onClick={() => setIsPreview(!isPreview)}
                    className="absolute top-4 right-4 z-10 p-2 bg-vscode-sidebar/80 hover:bg-vscode-active rounded border border-vscode-border transition-colors text-vscode-text"
                    title={isPreview ? "View Code" : "Preview Markdown"}
                >
                    {isPreview ? <Code size={16} /> : <Eye size={16} />}
                </button>
            )}

            <div className="h-full overflow-auto">
                {isPreview && isMarkdown ? (
                    <div className="p-8 max-w-4xl mx-auto prose prose-invert prose-headings:text-vscode-text-active prose-p:text-vscode-text prose-a:text-blue-400 prose-pre:bg-vscode-sidebar">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {code}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        showLineNumbers={showLineNumbers}
                        wrapLines={false}
                        className="code-editor-pre"
                        lineNumberStyle={{
                            color: "var(--vscode-gutter)",
                            paddingRight: "1rem",
                            minWidth: "3rem",
                            textAlign: "right",
                        }}
                        customStyle={{
                            margin: 0,
                            padding: "1rem",
                            background: "transparent",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            fontFamily: "var(--font-mono)",
                            whiteSpace: "pre", // Strictly prevent wrapping
                            wordBreak: "keep-all",
                            overflowWrap: "normal",
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily: "var(--font-mono)",
                                whiteSpace: "pre",
                            }
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
}
