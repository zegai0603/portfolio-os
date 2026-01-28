import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const ABOUT_TSX = `interface AboutProps {
    onBack: () => void;
}

const ASCII_NAME = \`
  _____ _______ ______ _  ____     _______ 
 |_   _|__   __|  ____| |/ /\\\\ \\\\   / /  ___|
   | |    | |  | |__  | ' /  \\\\ \\\\_/ /| |__  
   | |    | |  |  __| |  <    \\\\   / |  __| 
   | |    | |  | |____| . \\\\    | |  | |___ 
   |_|    |_|  |______|_|\\\\_\\\\   |_|  |_____|
\`;

export default function About({ onBack }: AboutProps) {
    return (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat about.md
            </div>

            <div className="cli-about">
                <pre className="cli-ascii">{ASCII_NAME}</pre>

                <div className="cli-about-content">
                    <h2 className="cli-heading"># ${config.name || "Developer"}</h2>

                    <p className="cli-text">
                        <span className="cli-key">role:</span> ${config.title || "Software Developer"}
                    </p>

                    <p className="cli-text">
                        <span className="cli-key">location:</span> ${config.location || "Earth"}
                    </p>

                    <p className="cli-text cli-bio">${config.bio || "Building things for the web."}</p>

                    <p className="cli-text">
                        <span className="cli-key">focus:</span> ${config.currentFocus || "Learning and growing"}
                    </p>
                </div>
            </div>

            <button className="cli-back" onClick={onBack}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>{" "}
                <span className="cli-back-cmd">cd .. (back)</span>
            </button>
        </div>
    );
}`;

export default function FrontendAboutPage() {
    return <CodeEditor code={ABOUT_TSX} language="tsx" />;
}
