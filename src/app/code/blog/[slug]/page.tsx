"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { getBlogPostBySlug, BlogPost } from "@/lib/supabase";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getBlogPostBySlug(slug)
                .then(({ data }) => {
                    if (data) setPost(data);
                })
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return <CodeEditor code="# Loading..." language="markdown" />;
    }

    if (!post) {
        return <CodeEditor code="# 404 - Post not found" language="markdown" />;
    }

    return (
        <CodeEditor
            code={post.content}
            language="markdown"
        />
    );
}
