import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const APP_TSX = `"use client";

import { useState, useCallback, useEffect } from "react";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contacts from "./Contacts";
import "./styles.css";

type View = "home" | "about" | "projects" | "skills" | "contacts";

export default function App() {
    const [activeView, setActiveView] = useState<View>("home");

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

        if (e.key === "Escape" || e.key === "h") setActiveView("home");
        else if (e.key === "a") setActiveView("about");
        else if (e.key === "p") setActiveView("projects");
        else if (e.key === "s") setActiveView("skills");
        else if (e.key === "c") setActiveView("contacts");
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const renderContent = () => {
        switch (activeView) {
            case "about": return <About onBack={() => setActiveView("home")} />;
            case "projects": return <Projects onBack={() => setActiveView("home")} />;
            case "skills": return <Skills onBack={() => setActiveView("home")} />;
            case "contacts": return <Contacts onBack={() => setActiveView("home")} />;
            default: return <Home onNavigate={setActiveView} />;
        }
    };

    return (
        <div className="cli-root">
            <div className="cli-container">
                {renderContent()}
            </div>
        </div>
    );
}`;

export default function FrontendAppPage() {
  return <CodeEditor code={APP_TSX} language="tsx" />;
}
