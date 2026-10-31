import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const POSTS = join(process.cwd(), "src/content/blog");

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
    const files = await readdir(POSTS);
    return files.map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

const readPost = (slug: string) => readFile(join(POSTS, `${slug}.md`), "utf8").catch(() => notFound());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await readPost((await params).slug);
    return { title: `${post.split("\n")[0].replace(/^# /, "")} | Zhe Khai Tew` };
}

export default async function BlogPost({ params }: Props) {
    const post = await readPost((await params).slug);
    return (
        <main className="prose prose-invert prose-headings:font-display prose-headings:font-extralight mx-auto max-w-[62ch] px-5 py-12">
            <Link href="/#plot" className="text-xs no-underline">← Back</Link>
            <ReactMarkdown>{post}</ReactMarkdown>
        </main>
    );
}
