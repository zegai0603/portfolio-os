"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { Mail, Github, Linkedin, Instagram, Folder, Star, MapPin, User, Code, Terminal } from "lucide-react";

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
    status: string;
}

export default function FrontendPreviewPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [activeView, setActiveView] = useState("home");
    const [typedText, setTypedText] = useState("");
    const fullText = `Hello, I'm ${config.name || "Developer"}`;

    // Typing animation
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

    // Fetch data
    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((d) => setProjects(d.projects || []));
        fetch("/api/skills")
            .then((r) => r.json())
            .then((d) => setSkills(d.skills || []));
    }, []);

    const renderContent = () => {
        switch (activeView) {
            case "projects":
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
                                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.07]SX transition-all duration-300 hover:-translate-y-1"
                                        style={{ animationDelay: `${i * 100}ms` }}
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
            case "skills":
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
                                                    width: `${skill.level * 100}%`,
                                                    animationDelay: `${i * 150}ms`,
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
            case "contact":
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
                                {[
                                    { icon: <Mail className="w-6 h-6" />, label: "Email", value: config.email, href: `mailto:${config.email}` },
                                    { icon: <Github className="w-6 h-6" />, label: "GitHub", value: config.githubUsername, href: config.github },
                                    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Connect", href: config.linkedin },
                                    { icon: <Instagram className="w-6 h-6" />, label: "Instagram", value: config.instagramHandle, href: config.instagram },
                                ].map((link) => (
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
            case "home":
            default:
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
                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all cursor-default"
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
                                    className="group px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all hover:scale-105"
                                >
                                    View GitHub →
                                </a>
                                <button
                                    onClick={() => setActiveView("contact")}
                                    className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
                                >
                                    Contact Me
                                </button>
                            </div>
                        </div>
                    </section>
                );
        }
    };

    return (
        <div className="absolute inset-0 bg-[#0a0a0f] text-white font-mono flex flex-col overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0a0f]/95 border-b border-white/10 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-xl">{"<"}</span>
                        <span className="font-semibold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {config.name?.split(" ")[0] || "Dev"}
                        </span>
                        <span className="text-cyan-400 text-xl">{"/>"}</span>
                    </div>
                    <div className="flex gap-8 text-sm">
                        {["home", "projects", "skills", "contact"].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveView(section)}
                                className={`relative py-2 transition-colors hover:text-cyan-400 ${activeView === section ? "text-cyan-400" : "text-gray-400"
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                {activeView === section && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden relative z-0">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/10 text-center relative z-10 bg-[#0a0a0f]/95 backdrop-blur-md">
                <p className="text-sm text-gray-600">
                    Built with <span className="text-cyan-400">Next.js</span> + <span className="text-purple-400">TypeScript</span>
                    <span className="ml-2 animate-pulse">_</span>
                </p>
            </footer>
        </div>
    );
}
