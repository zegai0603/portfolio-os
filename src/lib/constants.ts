import { config } from "./config";

// File tree structure for the portfolio
export interface FileNode {
    name: string;
    type: "file" | "folder";
    path: string;
    icon?: string;
    children?: FileNode[];
}

export const FILE_TREE: FileNode[] = [
    {
        name: "src",
        type: "folder",
        path: "/",
        children: [
            {
                name: "portfolio",
                type: "folder",
                path: "/",
                children: [
                    { name: "intro.py", type: "file", path: "/", icon: "python" },
                    { name: "projects.json", type: "file", path: "/projects", icon: "json" },
                    { name: "skills.ts", type: "file", path: "/skills", icon: "typescript" },
                    { name: "contact.md", type: "file", path: "/contact", icon: "markdown" },
                ],
            },
            {
                name: "blog",
                type: "folder",
                path: "/blog",
                children: [],
            },
            {
                name: "frontend",
                type: "folder",
                path: "/frontend",
                children: [
                    { name: "package.json", type: "file", path: "/frontend/package", icon: "json" },
                    { name: "index.html", type: "file", path: "/frontend/index", icon: "html" },
                    { name: "main.tsx", type: "file", path: "/frontend/main", icon: "typescript" },
                    { name: "App.tsx", type: "file", path: "/frontend/app", icon: "typescript" },
                    { name: "Home.tsx", type: "file", path: "/frontend/home", icon: "typescript" },
                    { name: "Projects.tsx", type: "file", path: "/frontend/projects-page", icon: "typescript" },
                    { name: "Skills.tsx", type: "file", path: "/frontend/skills-page", icon: "typescript" },
                    { name: "Contact.tsx", type: "file", path: "/frontend/contact-page", icon: "typescript" },
                ],
            },
        ],
    },
];

// Terminal commands - uses config for dynamic content
export const TERMINAL_COMMANDS: Record<string, string | (() => string | Promise<string>)> = {
    help: `Available commands:
  cd <path>   - Change directory (e.g., cd frontend)
  ls          - List current directory
  pwd         - Print working directory
  git commit  - Commit changes (git commit -m "msg" [--author "Name"])
  npm run dev - Run frontend app (when in frontend folder)
  whoami      - About me
  date        - Current date/time
  clear       - Clear terminal
  skills      - Show my skills
  contact     - Contact information`,

    whoami: () => `Developer {
  name: "${config.name}",
  role: "${config.title}",
  location: "${config.location}",
  interests: ${JSON.stringify(config.hobbies)}
}`,

    date: () => new Date().toLocaleString(),

    skills: () => `Languages: ${config.languages.join(", ")}
Current Focus: ${config.currentFocus}`,

    contact: () => `Email: ${config.email}
GitHub: ${config.github}
LinkedIn: ${config.linkedin}
Instagram: ${config.instagramHandle}`,
};

// Directory contents for ls command
export const DIRECTORY_CONTENTS: Record<string, string> = {
    "~": `src/
├── portfolio/
├── blog/
└── frontend/`,

    "~/src": `portfolio/
blog/
frontend/`,

    "~/src/portfolio": `intro.py
projects.json
skills.ts
contact.md`,

    "~/src/blog": `hello-world.md`,

    "~/src/frontend": `package.json
index.html
main.tsx
App.tsx
Home.tsx
Projects.tsx
Skills.tsx
Contact.tsx`,
};

// Generate intro content dynamically from config
export function getIntroContent(): string {
    return `class Developer:
    """${config.bio}"""
    
    def __init__(self):
        self.name = "${config.name}"
        self.title = "${config.title}"
        self.location = "${config.location}"
        self.languages = ${JSON.stringify(config.languages)}
        self.current_focus = "${config.currentFocus}"
        
    @property
    def hobbies(self) -> list[str]:
        return ${JSON.stringify(config.hobbies, null, 12)}
    
    @property
    def social_links(self) -> dict:
        return {
            "github": "${config.github}",
            "linkedin": "${config.linkedin}",
            "instagram": "${config.instagram}",
            "email": "${config.email}"
        }
    
    def say_hello(self) -> str:
        return f"Hello! I'm {self.name}, a {self.title}."


# Initialize
me = Developer()
print(me.say_hello())
`;
}
