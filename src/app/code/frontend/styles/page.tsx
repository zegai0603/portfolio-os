import { CodeEditor } from "@/components/editor/CodeEditor";

const STYLES_CSS = `@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap");

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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

.cli-prompt { color: var(--fg); }
.cli-prompt-bottom { margin-top: 1rem; }
.cli-tilde { color: var(--cyan); }
.cli-dollar { color: var(--fg-dim); }

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

.cli-dot { color: var(--fg-dim); }

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

.cli-link:hover { color: #fbbf24; }
.cli-label { color: var(--orange); }
.cli-arrow { color: var(--fg-dim); }
.cli-desc { color: var(--fg); }

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

.cli-text { margin: 0; }
.cli-key { color: var(--cyan); }
.cli-bio { color: var(--fg-dim); margin-top: 0.5rem; }

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

.cli-tree-item:hover { background: rgba(255,255,255,0.05); }
.cli-tree-branch { color: var(--fg-dim); }
.cli-tree-name { color: var(--orange); font-weight: 500; }
.cli-tree-lang { color: var(--cyan); font-size: 0.85rem; }
.cli-tree-stars { color: var(--green); font-size: 0.85rem; }
.cli-tree-desc { color: var(--fg-dim); font-size: 0.85rem; }

/* SKILLS */
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

.cli-skill-name { color: var(--orange); }

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

.cli-skill-pct { color: var(--fg-dim); font-size: 0.8rem; min-width: 35px; }
.cli-skill-status { color: var(--green); font-size: 0.8rem; }

/* CONTACTS */
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

.cli-contact-row:hover { background: rgba(255,255,255,0.05); }
.cli-contact-proto { color: var(--cyan); }
.cli-contact-addr { color: var(--orange); }
.cli-contact-state { color: var(--green); font-size: 0.85rem; }
.cli-contact-location { color: var(--fg-dim); }
.cli-contact-msg { margin-top: 0.5rem; }
.cli-comment { color: var(--fg-dim); font-style: italic; }

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

.cli-back:hover { opacity: 0.7; }
.cli-back-cmd { color: var(--cyan); }

.cli-loading,
.cli-empty {
    color: var(--fg-dim);
    padding: 1rem 0;
}

@media (max-width: 600px) {
    .cli-container { padding: 1.5rem; }
    .cli-row { grid-template-columns: 16px 90px 20px 1fr; font-size: 0.9rem; }
    .cli-ascii { font-size: 0.35rem; }
    .cli-skills-header, .cli-skill-row { grid-template-columns: 80px 1fr 60px; }
    .cli-contacts-header, .cli-contact-row { grid-template-columns: 60px 1fr 80px; }
}`;

export default function FrontendStylesPage() {
    return <CodeEditor code={STYLES_CSS} language="css" />;
}
