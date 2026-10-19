"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";
import { SquareTerminal } from "lucide-react";
import "@/app/preview/preview.css";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import { profile, type Project } from "@/lib/profile";
import type { FileNode } from "@/lib/constants";

type View = "home" | "about" | "projects" | "project" | "skills" | "contacts";

const GRID_MUL: [number, number] = [2, 1];
const projects = profile.projects;
const skillGroups = profile.skillGroups;

export function PreviewShell() {
    const router = useRouter();
    const [activeView, setActiveView] = useState<View>("home");
    const [openProject, setOpenProject] = useState<Project | null>(null);

    const showProject = (project: Project) => {
        setOpenProject(project);
        setActiveView("project");
    };

    useEffect(() => {
        // Prefetch all code routes
        import("@/lib/constants").then(({ FILE_TREE }) => {
            const prefetchNodes = (nodes: FileNode[]) => {
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

        if (e.key === "Escape") setActiveView((v) => (v === "project" ? "projects" : "home"));
        else if (e.key === "h") setActiveView("home");
        else if (e.key === "a") setActiveView("about");
        else if (e.key === "p") setActiveView("projects");
        else if (e.key === "s") setActiveView("skills");
        else if (e.key === "c") setActiveView("contacts");
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const languages = skillGroups[0]?.items ?? [];
    const hobbies = config.hobbies?.filter(Boolean) || [];

    const contactLinks = [
        { label: "mail", value: config.email, href: `mailto:${config.email}` },
        { label: "github", value: config.githubUsername, href: config.github },
        { label: "linkedin", value: config.linkedinHandle, href: config.linkedin },
        { label: "resume", value: "resume.pdf", href: config.resumeUrl },
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
                        {projects.slice(0, 3).map((p) => p.name).join(", ")} and {projects.length - 3} more
                    </span>
                </div>

                <div className="cli-row">
                    <span className="cli-dot">.</span>
                    <button className="cli-link" onClick={() => setActiveView("skills")}>
                        skills
                    </button>
                    <span className="cli-arrow">→</span>
                    <span className="cli-desc">{languages.slice(0, 4).join(", ")}</span>
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

            <div className="cli-tree">
                <div className="cli-tree-header">projects/</div>
                {projects.map((project, i) => (
                    <button
                        key={project.slug}
                        type="button"
                        onClick={() => showProject(project)}
                        className="cli-tree-item"
                    >
                        <span className="cli-tree-branch">
                            {i === projects.length - 1 ? "└──" : "├──"}
                        </span>
                        <span className="cli-tree-body">
                            <span className="cli-tree-name">{project.name}/</span>
                            <span className="cli-tree-lang">[{project.stack.slice(0, 3).join(", ")}]</span>
                            <span className="cli-tree-desc">{project.tagline}</span>
                        </span>
                    </button>
                ))}
            </div>

            <button className="cli-back" onClick={() => setActiveView("home")}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back]</span>
                <span className="cli-cursor">▊</span>
            </button>
        </div>
    );

    // PROJECT - One project's detail, read like a README
    const renderProject = () => {
        const p = openProject;
        if (!p) return renderProjects();
        return (
            <div className="cli-section">
                <div className="cli-prompt">
                    <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat projects/{p.slug}/README.md
                </div>

                <div className="cli-project">
                    <h2 className="cli-heading"># {p.name}</h2>
                    <p className="cli-text">{p.tagline}</p>
                    <p className="cli-text">
                        <span className="cli-key">when:</span> {p.period}
                        {p.role && <> · {p.role}</>}
                    </p>
                    <p className="cli-text">
                        <span className="cli-key">stack:</span> {p.stack.join(", ")}
                    </p>

                    <ul className="cli-highlights">
                        {p.highlights.map((h) => (
                            <li key={h}>{h}</li>
                        ))}
                    </ul>

                    {p.links.length > 0 && (
                        <p className="cli-text cli-project-links">
                            {p.links.map((l) => (
                                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="cli-link">
                                    {l.label} ↗
                                </a>
                            ))}
                        </p>
                    )}
                    {p.note && <p className="cli-comment"># {p.note}</p>}
                </div>

                <button className="cli-back" onClick={() => setActiveView("projects")}>
                    <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> <span className="cli-back-cmd">cd .. [back to projects]</span>
                    <span className="cli-cursor">▊</span>
                </button>
            </div>
        );
    };

    // SKILLS - Progress bars with terminal style
    const renderSkills = () => (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat skills.md
            </div>

            <div className="cli-skill-groups">
                {skillGroups.map((g) => (
                    <div key={g.group} className="cli-skill-group">
                        <span className="cli-key">{g.group.toLowerCase()}:</span>
                        <span className="cli-skill-items">{g.items.join(", ")}</span>
                    </div>
                ))}
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
            case "project": return renderProject();
            case "skills": return renderSkills();
            case "contacts": return renderContacts();
            default: return renderHome();
        }
    };

    return (
        <div className="relative w-full h-full min-h-[600px] overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-black/50">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <FaultyTerminal
                    scale={1.7}
                    gridMul={GRID_MUL}
                    digitSize={1}
                    timeScale={0.7}
                    pause={false}
                    scanlineIntensity={0}
                    glitchAmount={1}
                    flickerAmount={1}
                    noiseAmp={1}
                    chromaticAberration={0}
                    dither={0}
                    curvature={0}
                    tint="#ceab5f"
                    mouseReact
                    mouseStrength={0.2}
                    pageLoadAnimation
                    brightness={0.4}
                />
            </div>

            {/* Content Area */}
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="cli-root !bg-transparent w-full h-full pointer-events-auto">
                    <div className="cli-container">
                        {/* keyed so each view opens scrolled to the top */}
                        <div className="cli-content-scroll" key={activeView + (openProject?.slug ?? "")}>
                            {renderContent()}
                        </div>
                    </div>

                    {/* Explore Link at top right */}
                    <div className="explore-btn-container">
                        <Link href="/code" className="explore-btn" prefetch={true}>
                            <SquareTerminal size={14} />
                            <span>Code</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
