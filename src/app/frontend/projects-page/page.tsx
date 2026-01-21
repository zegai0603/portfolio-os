import { CodeEditor } from "@/components/editor/CodeEditor";

const PROJECTS_TSX = `import { useEffect, useState } from 'react';

interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  topics: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Fetching repos...</div>;

  return (
    <div className="page projects">
      <div className="terminal-header">
        <span className="prompt">$</span> gh repo list --json
      </div>
      
      <div className="grid">
        {projects.map(project => (
          <a 
            key={project.name} 
            href={project.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <div className="card-header">
              <span className="repo-icon">📁</span>
              <span className="repo-name">{project.name}</span>
              <span className="stars">⭐ {project.stars}</span>
            </div>
            <p className="description">{project.description}</p>
            <div className="card-footer">
              <span className="language">{project.language}</span>
              <div className="topics">
                {project.topics?.slice(0, 3).map(topic => (
                  <span key={topic} className="topic">{topic}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}`;

export default function FrontendProjectsPage() {
    return <CodeEditor code={PROJECTS_TSX} language="tsx" />;
}
