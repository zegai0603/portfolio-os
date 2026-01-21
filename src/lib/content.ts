import { config } from "./config";
import { getIntroContent } from "./constants";

export { getIntroContent };

export function getReadmeContent(): string {
  return `# Portfolio Terminal

Hi there! Welcome to my VS Code-inspired portfolio! Navigate using the terminal or sidebar.

## Terminal Commands

| Command | Description |
|---------|-------------|
| \`help\` | Show all available commands |
| \`cd <dir>\` | Change directory (e.g., \`cd frontend\`) |
| \`ls\` | List current directory contents |
| \`pwd\` | Print working directory |
| \`npm run dev\` | Launch frontend preview (in /frontend) |
| \`git commit -m "msg" --author "authorname"\` | Add a comment to guestbook |
| \`whoami\` | Display developer info |
| \`skills\` | Show skill summary |
| \`contact\` | Display contact info |
| \`clear\` | Clear terminal |

## Navigation

- **Sidebar**: Click files to open them in the editor
- **Tabs**: Switch between open files
- **Terminal**: Toggle with \`Ctrl+\\\`\`

## Frontend Preview

\`\`\`bash
cd frontend
npm run dev
\`\`\`

This opens an interactive portfolio with Home, Projects, Skills, and Contact pages.

## Keyboard Shortcuts

- \`Ctrl+\\\`\` - Toggle terminal
- \`Ctrl+P\` - Command palette
- \`Ctrl+B\` - Toggle sidebar

---

Built with Next.js + TypeScript. Inspired by VS Code.
`;
}

export function getSkillsContent(): string {
  const skillsData = config.skillsData.length > 0
    ? config.skillsData
    : config.languages.map((lang, index) => ({
      name: lang,
      level: Math.max(95 - (index * 5), 50),
      status: index < 3 ? "Stable" : "Active",
      memory_usage: "Low",
    }));

  const skillsArray = skillsData.map((s: { name: string; level: number; status?: string; memory_usage?: string }) => ({
    name: s.name,
    level: s.level,
    status: s.status || "Active",
    memory_usage: s.memory_usage || "Medium"
  }));

  return `// skills.ts - Developer Skillset Telemetry

interface Skill {
  name: string;
  level: number;        // 0-100 proficiency
  status: "Stable" | "Active" | "Experimental";
  memory_usage: "Low" | "Medium" | "High";
}

export const developer = {
  name: "${config.name}",
  title: "${config.title}",
  current_focus: "${config.currentFocus}"
};

export const skills: Skill[] = ${JSON.stringify(skillsArray, null, 2)};

export const hobbies: string[] = ${JSON.stringify(config.hobbies, null, 2)};

// Process telemetry
export function getSkillReport(): string {
  return skills
    .sort((a, b) => b.level - a.level)
    .map(s => \`[\${s.status.padEnd(12)}] \${s.name}: \${s.level}%\`)
    .join("\\n");
}
`;
}

export function getContactContent(): string {
  return `# Contact Me

## Get in Touch

I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.

---

## Email
**${config.email}**

Drop me an email and I'll get back to you as soon as possible.

---

## Social Links

| Platform | Link |
|----------|------|
| GitHub | [${config.githubUsername}](${config.github}) |
| LinkedIn | [LinkedIn Profile](${config.linkedin}) |
| Instagram | [${config.instagramHandle}](${config.instagram}) |

---

## Open to Opportunities

- **Full-time positions**
- **Freelance projects**
- **Open source collaboration**
- **Technical consulting**

---

## Location

Based in **${config.location}**

_Available for remote work worldwide._

---

> "The best way to predict the future is to create it." - Peter Drucker
`;
}

// Frontend files content map
export const FRONTEND_FILES: Record<string, string> = {
  "/frontend/package.json": `{
  "name": "portfolio-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}`,
  "/frontend/index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
  "/frontend/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  "/frontend/App.tsx": `import { useState } from 'react'
import { Home } from './Home'
import { Projects } from './Projects'
import { Skills } from './Skills'
import { Contact } from './Contact'

function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch(page) {
      case 'home': return <Home />
      case 'projects': return <Projects />
      case 'skills': return <Skills />
      case 'contact': return <Contact />
      default: return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <nav className="p-4 border-b border-gray-800 flex gap-4">
        <button onClick={() => setPage('home')} className={page === 'home' ? 'text-blue-400' : 'text-gray-400'}>Home</button>
        <button onClick={() => setPage('projects')} className={page === 'projects' ? 'text-blue-400' : 'text-gray-400'}>Projects</button>
        <button onClick={() => setPage('skills')} className={page === 'skills' ? 'text-blue-400' : 'text-gray-400'}>Skills</button>
        <button onClick={() => setPage('contact')} className={page === 'contact' ? 'text-blue-400' : 'text-gray-400'}>Contact</button>
      </nav>
      <main className="p-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App`,
  "/frontend/Home.tsx": `"use client";
import { useState, useEffect } from 'react';
import { config } from '@/lib/config';

export function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = \`Hello, I'm \${config.name || "Developer"}\`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section className="relative h-full flex items-center justify-center px-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            {typedText}
          </span>
          <span className="animate-pulse text-cyan-400">|</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4">
          {config.title || "Full Stack Developer"}
        </p>

        <p className="text-gray-500 max-w-2xl mx-auto mb-10">
          {config.bio || "Crafting digital experiences with code"}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(config.languages.length > 0 ? config.languages : ["TypeScript", "Python"]).map((lang) => (
            <span
              key={lang}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:border-cyan-400/50"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <a
            href={config.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium"
          >
            View GitHub {'->'}
          </a>
        </div>
      </div>
    </section>
  );
}`,
  "/frontend/Projects.tsx": `"use client";
import { useEffect, useState } from 'react';
import { Folder, Star } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  topics: string[];
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []));
  }, []);

  return (
    <section className="relative py-12 px-6 fade-in h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-medium">// PROJECTS</span>
          <h2 className="text-4xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: \`\${i * 100}ms\` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center text-cyan-400">
                  <Folder size={24} />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star size={16} className="text-yellow-500" />
                  <span>{project.stars}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-xs text-gray-400">{project.language}</span>
              </div>
            </a>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500">
            <p>Loading projects from GitHub...</p>
          </div>
        )}
      </div>
    </section>
  );
}`,
  "/frontend/Skills.tsx": `"use client";
import { useEffect, useState } from 'react';
import { config } from '@/lib/config';

interface Skill {
  name: string;
  level: number;
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => setSkills(d.skills || []));
  }, []);

  return (
    <section className="relative py-12 px-6 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium">// SKILLS</span>
          <h2 className="text-4xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
        </div>

        <div className="space-y-6">
          {skills.map((skill, i) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500">{Math.round(skill.level * 100)}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000 ease-out"
                  style={{
                    width: \`\${skill.level * 100}%\`,
                    animationDelay: \`\${i * 150}ms\`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
          {(config.hobbies.length > 0 ? config.hobbies : ["Coding"]).map((hobby) => (
            <div
              key={hobby}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-sm text-gray-400 hover:border-purple-400/50 transition-all"
            >
              {hobby}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  "/frontend/Contact.tsx": `"use client";
import { config } from '@/lib/config';
import { Mail, Github, Linkedin, Instagram, MapPin } from 'lucide-react';

export function Contact() {
  const links = [
    { icon: <Mail className="w-6 h-6" />, label: "Email", value: config.email, href: \`mailto:\${config.email}\` },
    { icon: <Github className="w-6 h-6" />, label: "GitHub", value: config.githubUsername, href: config.github },
    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Connect", href: config.linkedin },
    { icon: <Instagram className="w-6 h-6" />, label: "Instagram", value: config.instagramHandle, href: config.instagram },
  ];

  return (
    <section className="relative py-12 px-6 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="mb-16">
          <span className="text-cyan-400 text-sm font-medium">// CONTACT</span>
          <h2 className="text-4xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-500 mt-4">
            Open to collaborations, freelance projects, and new opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto pb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.07] transition-all"
            >
              <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">{link.icon}</span>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider">{link.label}</div>
                <div className="font-medium group-hover:text-cyan-400 transition-colors">
                  {link.value || "Not set"}
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-12 text-gray-600 text-sm flex items-center justify-center gap-2">
          <MapPin size={16} /> Based in {config.location || "Earth"} • Available worldwide
        </p>
      </div>
    </section>
  );
}`,
  "/frontend/project.json": `{
  "name": "portfolio-frontend",
  "version": "1.0.0",
  "description": "Inner React application for portfolio demo",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "6.20.0", 
    "lucide-react": "0.294.0"
  },
  "devDependencies": {
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "@vitejs/plugin-react": "4.2.0",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.5",
    "typescript": "5.3.0",
    "vite": "5.0.0"
  }
}`
};

export function getFrontendFileContent(path: string): string {
  // Exact match
  if (FRONTEND_FILES[path]) return FRONTEND_FILES[path];

  // Check if it's one of the files we haven't fully hardcoded yet but want to be searchable if they exist
  // For now, we only return what we have.
  return "";
}

export function getAllSearchableContent(): Record<string, string> {
  return {
    "/intro.py": getIntroContent(),
    "/skills.ts": getSkillsContent(),
    "/contact.md": getContactContent(),
    ...FRONTEND_FILES
  };
}
