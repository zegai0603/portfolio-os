import { CodeEditor } from "@/components/editor/CodeEditor";

const BLOG_INDEX_CONTENT = `# Blog

Welcome to my blog! Here I write about software development, technology, and my journey as a developer.

---

## Recent Posts

### [Vibecoding this Portfolio](/blog/vibecoding-portfolio)
*Seeded from Firestore*

How this OS-like portfolio was built with Next.js, Firebase, Tailwind CSS, and AI agents.

---

### Coming Soon...

More posts are on the way! Topics I plan to cover:

- Building a VS Code-inspired portfolio
- TypeScript best practices
- Full-stack development with Next.js
- DevOps and deployment strategies

---

> Stay tuned for more content!
`;

export default function BlogPage() {
    return (
        <CodeEditor code={BLOG_INDEX_CONTENT} language="markdown" />
    );
}
