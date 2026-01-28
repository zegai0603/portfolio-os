"use client";

import { useEffect, useState, useCallback } from "react";
import { config } from "@/lib/config";

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

export default function FrontendPreviewPage() {
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
    }, []);

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
  _____ _______ ______ _  ____     _______ 
 |_   _|__   __|  ____| |/ /\\ \\   / /  ___|
   | |    | |  | |__  | ' /  \\ \\_/ /| |__  
   | |    | |  |  __| |  <    \\   / |  __| 
   | |    | |  | |____| . \\    | |  | |___ 
   |_|    |_|  |______|_|\\_\\   |_|  |_____|
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
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. (back)</span>
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
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. (back)</span>
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
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. (back)</span>
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
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. (back)</span>
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
                {renderContent()}
            </div>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap");

                :root {
                    --bg: #0a0a0a;
                    --fg: #d4d4d4;
                    --fg-dim: #737373;
                    --orange: #f59e0b;
                    --green: #ffffff;
                    --green-dim: #a3a3a3;
                    --cyan: #06b6d4;
                    --red: #ef4444;
                    --border: #ffffff;
                }

                .cli-root {
                    min-height: 100vh;
                    background: var(--bg);
                    color: var(--fg);
                    font-family: "IBM Plex Mono", monospace;
                    font-size: 15px;
                    line-height: 1.8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 1rem;
                }

                .cli-container {
                    width: 100%;
                    max-width: 600px;
                    border: 2px solid var(--border);
                    border-radius: 4px;
                    padding: 2rem;
                    min-height: 400px;
                }

                .cli-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .cli-prompt {
                    color: var(--fg);
                }

                .cli-prompt-bottom {
                    margin-top: 1rem;
                }

                .cli-tilde {
                    color: var(--cyan);
                }

                .cli-dollar {
                    color: var(--fg-dim);
                }

                .cli-cursor {
                    color: var(--orange);
                    animation: blink 1s step-end infinite;
                    margin-left: 0.5rem;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                /* HOME LIST */
                .cli-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .cli-row {
                    display: grid;
                    grid-template-columns: 20px 110px 24px 1fr;
                    gap: 0.5rem;
                    align-items: baseline;
                }

                .cli-dot {
                    color: var(--fg-dim);
                }

                .cli-link {
                    background: none;
                    border: none;
                    color: var(--orange);
                    font-family: inherit;
                    font-size: inherit;
                    text-decoration: underline;
                    cursor: pointer;
                    text-align: left;
                    padding: 0;
                }

                .cli-link:hover {
                    color: #fbbf24;
                }

                .cli-label {
                    color: var(--orange);
                }

                .cli-arrow {
                    color: var(--fg-dim);
                }

                .cli-desc {
                    color: var(--fg);
                }

                /* ABOUT */
                .cli-about {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .cli-ascii {
                    color: var(--orange);
                    font-size: 0.5rem;
                    line-height: 1.15;
                    overflow-x: auto;
                }

                .cli-about-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .cli-heading {
                    color: var(--green);
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0;
                }

                .cli-text {
                    margin: 0;
                }

                .cli-key {
                    color: var(--cyan);
                }

                .cli-bio {
                    color: var(--fg-dim);
                    margin-top: 0.5rem;
                }

                /* TREE - PROJECTS */
                .cli-tree {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .cli-tree-header {
                    color: var(--green);
                    font-weight: 600;
                }

                .cli-tree-item {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    color: var(--fg);
                    text-decoration: none;
                    padding: 0.25rem 0;
                    transition: background 100ms;
                }

                .cli-tree-item:hover {
                    background: rgba(255,255,255,0.05);
                }

                .cli-tree-branch {
                    color: var(--fg-dim);
                }

                .cli-tree-name {
                    color: var(--orange);
                    font-weight: 500;
                }

                .cli-tree-lang {
                    color: var(--cyan);
                    font-size: 0.85rem;
                }

                .cli-tree-stars {
                    color: var(--green);
                    font-size: 0.85rem;
                }

                .cli-tree-desc {
                    color: var(--fg-dim);
                    font-size: 0.85rem;
                }

                /* SKILLS - HTOP STYLE */
                .cli-skills {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .cli-skills-header {
                    display: grid;
                    grid-template-columns: 120px 1fr 80px;
                    gap: 1rem;
                    color: var(--fg-dim);
                    font-size: 0.8rem;
                    border-bottom: 1px solid var(--fg-dim);
                    padding-bottom: 0.25rem;
                }

                .cli-skill-row {
                    display: grid;
                    grid-template-columns: 120px 1fr 80px;
                    gap: 1rem;
                    align-items: center;
                }

                .cli-skill-name {
                    color: var(--orange);
                }

                .cli-skill-bar-wrap {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .cli-skill-bar {
                    flex: 1;
                    height: 10px;
                    background: #1a1a1a;
                    border: 1px solid var(--fg-dim);
                    overflow: hidden;
                }

                .cli-skill-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--green-dim), var(--green));
                    transition: width 400ms;
                }

                .cli-skill-pct {
                    color: var(--fg-dim);
                    font-size: 0.8rem;
                    min-width: 35px;
                }

                .cli-skill-status {
                    color: var(--green);
                    font-size: 0.8rem;
                }

                /* CONTACTS - NETSTAT STYLE */
                .cli-contacts {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .cli-contacts-header {
                    display: grid;
                    grid-template-columns: 80px 1fr 100px;
                    gap: 1rem;
                    color: var(--fg-dim);
                    font-size: 0.8rem;
                    border-bottom: 1px solid var(--fg-dim);
                    padding-bottom: 0.25rem;
                }

                .cli-contact-row {
                    display: grid;
                    grid-template-columns: 80px 1fr 100px;
                    gap: 1rem;
                    text-decoration: none;
                    color: var(--fg);
                    padding: 0.25rem 0;
                    transition: background 100ms;
                }

                .cli-contact-row:hover {
                    background: rgba(255,255,255,0.05);
                }

                .cli-contact-proto {
                    color: var(--cyan);
                }

                .cli-contact-addr {
                    color: var(--orange);
                }

                .cli-contact-state {
                    color: var(--green);
                    font-size: 0.85rem;
                }

                .cli-contact-location {
                    color: var(--fg-dim);
                }

                .cli-contact-msg {
                    margin-top: 0.5rem;
                }

                .cli-comment {
                    color: var(--fg-dim);
                    font-style: italic;
                }

                /* BACK BUTTON */
                .cli-back {
                    background: none;
                    border: none;
                    color: var(--fg);
                    font-family: inherit;
                    font-size: inherit;
                    cursor: pointer;
                    padding: 0;
                    margin-top: 1.5rem;
                    text-align: left;
                    transition: opacity 150ms;
                }

                .cli-back:hover {
                    opacity: 0.7;
                }

                .cli-back-cmd {
                    color: var(--cyan);
                }

                .cli-loading,
                .cli-empty {
                    color: var(--fg-dim);
                    padding: 1rem 0;
                }

                @media (max-width: 600px) {
                    .cli-container {
                        padding: 1.5rem;
                    }

                    .cli-row {
                        grid-template-columns: 16px 90px 20px 1fr;
                        font-size: 0.9rem;
                    }

                    .cli-ascii {
                        font-size: 0.35rem;
                    }

                    .cli-skills-header,
                    .cli-skill-row {
                        grid-template-columns: 80px 1fr 60px;
                    }

                    .cli-contacts-header,
                    .cli-contact-row {
                        grid-template-columns: 60px 1fr 80px;
                    }
                }
            `}</style>
        </div>
    );
}
