import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Comment {
    id: string;
    username: string;
    message: string;
    hash?: string; // Optional in DB if generated, but we include it
    prefix?: string;
    created_at: string;
    parent_id?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    repo_url?: string;
    live_url?: string;
    image_url?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string;
    created_at: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number;
    status: 'Stable' | 'Active' | 'Experimental';
    memory_usage: 'Low' | 'Medium' | 'High';
}

// Helper to add a comment (commit)
export async function addComment(message: string, username: string = "Guest") {
    // Generate a pseudo-random hash
    const hash = Math.random().toString(16).substring(2, 9);

    return await supabase.from('comments').insert({
        username,
        message,
        hash,
        prefix: 'feat' // Default prefix
    });
}

// Helper to get comments
export async function getComments() {
    return await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
}

// Blog helpers
export async function getBlogPosts() {
    return await supabase
        .from('blog_posts')
        .select('id, slug, title, created_at')
        .order('created_at', { ascending: false });
}

export async function getBlogPostBySlug(slug: string) {
    return await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
}
