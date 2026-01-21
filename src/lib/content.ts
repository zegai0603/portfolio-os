import { config } from "./config";
import { getIntroContent } from "./constants";

export { getIntroContent };

export function getSkillsContent(): string {
  const skillsData = config.skillsData.length > 0
    ? config.skillsData
    : config.languages.map((lang, index) => ({
      name: lang,
      level: Math.max(95 - (index * 5), 50),
      status: index < 3 ? "Stable" : "Active",
      memory_usage: "Low",
    }));

  const skillsArray = skillsData.map(s => ({
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
  "/frontend/Home.tsx": `import React from 'react'

export function Home() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
          <img 
            src="${config.avatarUrl}" 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover bg-gray-900"
          />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          ${config.name}
        </h1>
        <p className="text-xl text-gray-400">${config.title}</p>
        <p className="text-gray-300 max-w-lg mx-auto">
          ${config.bio}
        </p>
      </section>
    </div>
  )
}`,
  "/frontend/Projects.tsx": `import React, { useEffect, useState } from 'react'
  
export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center text-gray-500">Loading projects...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project: any) => (
        <div key={project.name} className="p-6 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-blue-500/50 transition-colors">
          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
             {project.topics && project.topics.map((t: string) => (
                <span key={t} className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-400">{t}</span>
             ))}
          </div>
          <div className="flex justify-between items-center mt-auto">
             <span className="text-sm text-gray-500">{project.language}</span>
             <span className="text-sm text-yellow-500">★ {project.stars}</span>
          </div>
        </div>
      ))}
      {projects.length === 0 && <div className="col-span-2 text-center text-gray-500">No projects found.</div>}
    </div>
  )
}`,
  "/frontend/Skills.tsx": `import React, { useEffect, useState } from 'react'

export function Skills() {
  const [skills, setSkills] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data.skills || []))
  }, [])

  if (skills.length === 0) return <div className="text-center text-gray-500">Loading skills...</div>

  return (
    <div className="max-w-3xl mx-auto grid gap-6">
      {skills.map((skill: any) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-200">{skill.name}</span>
            <span className="text-gray-400">{Math.round(skill.level)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: \`\${skill.level}%\` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}`,
  "/frontend/Contact.tsx": `import React from 'react'

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
            placeholder="Say hello..."
          />
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-medium">
          Send Message
        </button>
      </form>

      <div className="pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-400">Or find me on:</p>
        <div className="flex gap-4 mt-2">
          <a href="${config.github}" className="text-blue-400 hover:underline">GitHub</a>
          <a href="${config.linkedin}" className="text-blue-400 hover:underline">LinkedIn</a>
          <a href="${config.instagram}" className="text-blue-400 hover:underline">Instagram</a>
        </div>
      </div>
    </div>
  )
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
