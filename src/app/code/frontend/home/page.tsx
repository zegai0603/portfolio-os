import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const HOME_TSX = `interface HomeProps {
    onNavigate: (view: "about" | "projects" | "skills" | "contacts") => void;
}

export default function Home({ onNavigate }: HomeProps) {
    return (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> ls -a
            </div>

            <div className="cli-list">
                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => onNavigate("about")}>
                        about
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        \${config.name || "Developer"}, \${config.location || "Earth"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => onNavigate("projects")}>
                        projects
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">GitHub repositories</span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => onNavigate("skills")}>
                        skills
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        \${config.languages?.slice(0, 4).join(", ") || "Various technologies"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <span className="cli-label">interests</span>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        \${config.hobbies?.join(", ") || config.currentFocus || "Building things"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => onNavigate("contacts")}>
                        contacts
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">mail, github, linkedin, instagram</span>
                </div>
            </div>

            <div className="cli-prompt cli-prompt-bottom">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>
                <span className="cli-cursor">▊</span>
            </div>
        </div>
    );
}`;

export default function FrontendHomePage() {
    return <CodeEditor code={HOME_TSX} language="tsx" />;
}
