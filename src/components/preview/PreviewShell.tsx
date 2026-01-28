"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";
import { SquareTerminal } from "lucide-react";
import "@/app/preview/preview.css";

interface Project {
    name: string;
    description: string;
    language: string;
    stars: number;
    url: string;
    topics: string[];
}

interface Skill {
    name: string;
    level: number;
    status?: string;
    memory_usage?: string;
}

type View = "home" | "about" | "projects" | "skills" | "contacts";

export function PreviewShell() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [activeView, setActiveView] = useState<View>("home");
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingSkills, setLoadingSkills] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((d) => setProjects(d.projects || []))
            .finally(() => setLoadingProjects(false));

        fetch("/api/skills")
            .then((r) => r.json())
            .then((d) => setSkills(d.skills || []))
            .finally(() => setLoadingSkills(false));

        // Prefetch all code routes
        import("@/lib/constants").then(({ FILE_TREE }) => {
            const prefetchNodes = (nodes: any[]) => {
                nodes.forEach(node => {
                    if (node.type === "file" && node.path) {
                        router.prefetch(node.path);
                    }
                    if (node.children) {
                        prefetchNodes(node.children);
                    }
                });
            };
            prefetchNodes(FILE_TREE);
        });
    }, [router]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

        if (e.key === "Escape" || e.key === "h") setActiveView("home");
        else if (e.key === "a") setActiveView("about");
        else if (e.key === "p") setActiveView("projects");
        else if (e.key === "s") setActiveView("skills");
        else if (e.key === "c") setActiveView("contacts");
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const languages = config.languages.filter(Boolean);
    const hobbies = config.hobbies?.filter(Boolean) || [];

    const contactLinks = [
        { label: "mail", value: config.email, href: `mailto:${config.email}` },
        { label: "github", value: config.githubUsername, href: config.github },
        { label: "linkedin", value: "linkedin", href: config.linkedin },
        { label: "instagram", value: config.instagramHandle, href: config.instagram },
    ].filter((c) => c.value && c.href);

    // HOME - Main directory listing
    const renderHome = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> ls -a
            </div>

            <div className="cli-list">
                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => setActiveView("about")}>
                        about
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        {config.name || "Developer"}, {config.location || "Earth"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => setActiveView("projects")}>
                        projects
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        {loadingProjects ? "Loading..." : `${projects.length} repositories`}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => setActiveView("skills")}>
                        skills
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        {languages.length > 0 ? languages.slice(0, 4).join(", ") : "Various technologies"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <span className="cli-label">interests</span>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        {hobbies.length > 0 ? hobbies.join(", ") : config.currentFocus || "Building things"}
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => setActiveView("contacts")}>
                        contacts
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">
                        {contactLinks.map((l, i) => (
                            <span key={l.label}>
                                {l.label}
                                {i < contactLinks.length - 1 && ", "}
                            </span>
                        ))}
                    </span>
                </div>
            </div>

            <div className="cli-prompt cli-prompt-bottom">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>
                <span className="cli-cursor">▊</span>
            </div>
        </div>
    );

    // ABOUT - Bio page with ASCII header
    const renderAbout = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat about.md
            </div>

            <div className="cli-about">
                <pre className="cli-ascii">{`
   ______          __              
  /_  __/__  ___  / /____  _____   
   / / /_  / / _ \\/ //_/ / / / _ \\  
  / /   / /_/  __/ ,< / /_/ /  __/  
 /_/   /___/\\___/_/|_|\\__, /\\___/   
                     /____/         
`}</pre>

                <div className="cli-about-content">
                    <h2 className="cli-heading"># {config.name || "Developer"}</h2>

                    {config.title && (
                        <p className="cli-text">
                            <span className="cli-key">role:</span> {config.title}
                        </p>
                    )}

                    {config.location && (
                        <p className="cli-text">
                            <span className="cli-key">location:</span> {config.location}
                        </p>
                    )}

                    {config.bio && (
                        <p className="cli-text cli-bio">{config.bio}</p>
                    )}

                    {config.currentFocus && (
                        <p className="cli-text">
                            <span className="cli-key">focus:</span> {config.currentFocus}
                        </p>
                    )}
                </div>
            </div>

            <button className="cli-back" onClick={() => setActiveView("home")}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back]</span>
                <span className="cli-cursor">▊</span>
            </button>
        </div>
    );

    // PROJECTS - File tree style
    const renderProjects = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> ls -a projects
            </div>

            {loadingProjects && <div className="cli-loading">Fetching repositories...</div>}

            {!loadingProjects && projects.length === 0 && (
                <div className="cli-empty">No projects found.</div>
            )}

            {!loadingProjects && projects.length > 0 && (
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

            <button className="cli-back" onClick={() => setActiveView("home")}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back]</span>
                <span className="cli-cursor">▊</span>
            </button>
        </div>
    );

    // SKILLS - Progress bars with terminal style
    const renderSkills = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat skills.md
            </div>

            {loadingSkills && <div className="cli-loading">Loading processes...</div>}

            {!loadingSkills && skills.length === 0 && languages.length === 0 && (
                <div className="cli-empty">No skill data available.</div>
            )}

            <div className="cli-skills">
                <div className="cli-skills-header">
                    <span>SKILL</span>
                    <span>LEVEL</span>
                    <span>STATUS</span>
                </div>

                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <div key={skill.name} className="cli-skill-row">
                            <span className="cli-skill-name">{skill.name}</span>
                            <div className="cli-skill-bar-wrap">
                                <div className="cli-skill-bar">
                                    <div
                                        className="cli-skill-fill"
                                        style={{ width: `${Math.round(skill.level * 100)}%` }}
                                    />
                                </div>
                                <span className="cli-skill-pct">{Math.round(skill.level * 100)}%</span>
                            </div>
                            <span className="cli-skill-status">{skill.status || "active"}</span>
                        </div>
                    ))
                ) : (
                    languages.map((lang, i) => (
                        <div key={lang} className="cli-skill-row">
                            <span className="cli-skill-name">{lang}</span>
                            <div className="cli-skill-bar-wrap">
                                <div className="cli-skill-bar">
                                    <div
                                        className="cli-skill-fill"
                                        style={{ width: `${90 - i * 10}%` }}
                                    />
                                </div>
                                <span className="cli-skill-pct">{90 - i * 10}%</span>
                            </div>
                            <span className="cli-skill-status">active</span>
                        </div>
                    ))
                )}
            </div>

            <button className="cli-back" onClick={() => setActiveView("home")}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back]</span>
                <span className="cli-cursor">▊</span>
            </button>
        </div>
    );

    // CONTACTS - Network connections style
    const renderContacts = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat contacts.md
            </div>

            <div className="cli-contacts">
                <div className="cli-contacts-header">
                    <span>PROTO</span>
                    <span>ADDRESS</span>
                    <span>STATE</span>
                </div>

                {contactLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cli-contact-row"
                    >
                        <span className="cli-contact-proto">{link.label}</span>
                        <span className="cli-contact-addr">{link.value || link.href}</span>
                        <span className="cli-contact-state">ESTABLISHED</span>
                    </a>
                ))}

                {config.location && (
                    <div className="cli-contact-row cli-contact-location">
                        <span className="cli-contact-proto">geo</span>
                        <span className="cli-contact-addr">{config.location}</span>
                        <span className="cli-contact-state">ACTIVE</span>
                    </div>
                )}
            </div>

            <div className="cli-contact-msg">
                <span className="cli-comment"># feel free to reach out!</span>
            </div>

            <button className="cli-back" onClick={() => setActiveView("home")}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back]</span>
                <span className="cli-cursor">▊</span>
            </button>
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case "about": return renderAbout();
            case "projects": return renderProjects();
            case "skills": return renderSkills();
            case "contacts": return renderContacts();
            default: return renderHome();
        }
    };

    return (
        <div className="cli-root">
            <div className="cli-container">
                <div className="cli-content-scroll">
                    {renderContent()}
                </div>
            </div>

            {/* Explore Link at top right - outside cli-container to avoid backdrop-filter containing block issue */}
            <div className="explore-btn-container">
                <Link href="/code" className="explore-btn" prefetch={true}>
                    <SquareTerminal size={14} />
                    <span>Code</span>
                </Link>
            </div>
        </div>
    );
}
