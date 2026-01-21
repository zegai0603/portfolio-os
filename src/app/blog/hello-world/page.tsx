import { CodeEditor } from "@/components/editor/CodeEditor";

const HELLO_WORLD_CONTENT = `# Hello World! 👋

*Published: January 21, 2024*

---

## Introduction

Welcome to my very first blog post! I'm excited to finally launch my developer blog as part of this VS Code-inspired portfolio.

## Why This Design?

As developers, we spend most of our time in code editors. So why not make our portfolio feel like home? This entire site is designed to mimic the Visual Studio Code interface, complete with:

- **Activity Bar** - Navigate between different sections
- **File Explorer** - Browse through my portfolio files
- **Tab System** - Keep track of open pages
- **Terminal** - Interactive command-line interface
- **Command Palette** - Press \`Ctrl+P\` to quick navigate

## Tech Stack

\`\`\`typescript
const techStack = {
  framework: "Next.js 14",
  language: "TypeScript",
  styling: "Tailwind CSS",
  database: "Supabase",
  deployment: "Vercel"
};
\`\`\`

## What's Next?

I plan to write about:

1. Software development best practices
2. Full-stack development tutorials
3. DevOps and deployment strategies
4. Personal projects and learnings

---

Thanks for reading! Feel free to explore the rest of my portfolio.

> "First, solve the problem. Then, write the code." - John Johnson
`;

export default function HelloWorldPost() {
    return (
        <CodeEditor code={HELLO_WORLD_CONTENT} language="markdown" />
    );
}
