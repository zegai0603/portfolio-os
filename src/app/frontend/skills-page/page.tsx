import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const SKILLS_TSX = `import { useEffect, useState } from "react";

interface Skill {
    name: string;
    level: number;
    status?: string;
}

interface SkillsProps {
    onBack: () => void;
}

export default function Skills({ onBack }: SkillsProps) {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/skills")
            .then((r) => r.json())
            .then((d) => setSkills(d.skills || []))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat skills.md
            </div>

            {loading && <div className="cli-loading">Loading processes...</div>}

            {!loading && skills.length === 0 && (
                <div className="cli-empty">No skill data available.</div>
            )}

            <div className="cli-skills">
                <div className="cli-skills-header">
                    <span>SKILL</span>
                    <span>LEVEL</span>
                    <span>STATUS</span>
                </div>

                {skills.map((skill) => (
                    <div key={skill.name} className="cli-skill-row">
                        <span className="cli-skill-name">{skill.name}</span>
                        <div className="cli-skill-bar-wrap">
                            <div className="cli-skill-bar">
                                <div
                                    className="cli-skill-fill"
                                    style={{ width: \`\${Math.round(skill.level * 100)}%\` }}
                                />
                            </div>
                            <span className="cli-skill-pct">{Math.round(skill.level * 100)}%</span>
                        </div>
                        <span className="cli-skill-status">{skill.status || "active"}</span>
                    </div>
                ))}
            </div>

            <button className="cli-back" onClick={onBack}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>{" "}
                <span className="cli-back-cmd">cd .. [back]</span>
            </button>
        </div>
    );
}`;

export default function FrontendSkillsPage() {
  return <CodeEditor code={SKILLS_TSX} language="tsx" />;
}
