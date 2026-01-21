import { CodeEditor } from "@/components/editor/CodeEditor";

const SKILLS_TSX = `import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  status: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data.skills || []));
  }, []);

  return (
    <div className="page skills">
      <div className="terminal-header">
        <span className="prompt">$</span> system-profiler --skills
      </div>
      
      <div className="content">
        <div className="skill-list">
          {skills.map(skill => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-status">[{skill.status}]</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: \`\${skill.level * 100}%\` }}
                />
              </div>
              <span className="skill-percent">{Math.round(skill.level * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

export default function FrontendSkillsPage() {
    return <CodeEditor code={SKILLS_TSX} language="tsx" />;
}
