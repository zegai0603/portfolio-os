import { CodeEditor } from "@/components/editor/CodeEditor";

const MAIN_TSX = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// CLI Portfolio - Entry Point
// Keyboard shortcuts: h(home) a(about) p(projects) s(skills) c(contacts)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);`;

export default function FrontendMainPage() {
    return <CodeEditor code={MAIN_TSX} language="tsx" />;
}
