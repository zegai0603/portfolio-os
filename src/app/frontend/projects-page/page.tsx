import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const PROJECTS_TSX = `import { useEffect, useState } from "react";

interface Project {
    name: string;
    description: string;
    language: string;
    stars: number;
    url: string;
    topics: string[];
}

interface ProjectsProps {
    onBack: () => void;
}

export default function Projects({ onBack }: ProjectsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((d) => setProjects(d.projects || []))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> ls -a projects
            </div>

            {loading && <div className="cli-loading">Fetching repositories...</div>}

            {!loading && projects.length === 0 && (
                <div className="cli-empty">No projects found.</div>
            )}

            {!loading && projects.length > 0 && (
                <div className="cli-tree">
                    <div className="cli-tree-header">projects/</div>
                    {projects.map((project, i) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cli-tree-item"
                        >
                            <span className="cli-tree-branch">
                                {i === projects.length - 1 ? "└──" : "├──"}
                            </span>
                            <span className="cli-tree-name">{project.name}/</span>
                            <span className="cli-tree-lang">[{project.language}]</span>
                            <span className="cli-tree-stars">★{project.stars}</span>
                            {project.description && (
                                <span className="cli-tree-desc">- {project.description}</span>
                            )}
                        </a>
                    ))}
                </div>
            )}

            <button className="cli-back" onClick={onBack}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>{" "}
                <span className="cli-back-cmd">cd .. [back]</span>
            </button>
        </div>
    );
}`;

export default function FrontendProjectsPage() {
  return <CodeEditor code={PROJECTS_TSX} language="tsx" />;
}
