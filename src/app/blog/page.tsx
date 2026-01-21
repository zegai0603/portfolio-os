import { CodeEditor } from "@/components/editor/CodeEditor";

const BLOG_INDEX_CONTENT = `# Blog

Welcome to my blog! Here I write about software development, technology, and my journey as a developer.

---

## Recent Posts

### [Hello World](/blog/hello-world)
*January 21, 2024*

My first blog post - an introduction and what to expect from this blog.

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
