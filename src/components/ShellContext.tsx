"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ShellContextType {
    isPreviewOpen: boolean;
    togglePreview: (open: boolean) => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function ShellProvider({ children }: { children: ReactNode }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const togglePreview = (open: boolean) => {
        setIsPreviewOpen(open);
    };

    return (
        <ShellContext.Provider value={{ isPreviewOpen, togglePreview }}>
            {children}
        </ShellContext.Provider>
    );
}

export function useShell() {
    const context = useContext(ShellContext);
    if (context === undefined) {
        throw new Error("useShell must be used within a ShellProvider");
    }
    return context;
}
