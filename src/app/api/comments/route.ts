import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateCommitHash, getRandomCommitPrefix } from '@/lib/utils';

// GET - Fetch all comments (requires Supabase)
export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

        if (!supabaseUrl) {
            return NextResponse.json({
                comments: [],
                message: "Comments feature requires Supabase configuration",
                source: 'none',
            });
        }

        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({
                comments: [],
                error: error.message,
                source: 'supabase_error',
            });
        }

        return NextResponse.json({ comments: data, source: 'supabase' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST - Create a new comment (requires Supabase)
export async function POST(request: NextRequest) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

        if (!supabaseUrl) {
            return NextResponse.json(
                { error: 'Comments feature requires Supabase configuration' },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { username, message } = body;

        if (!username || !message) {
            return NextResponse.json(
                { error: 'Username and message are required' },
                { status: 400 }
            );
        }

        const hash = generateCommitHash(message);
        const prefix = getRandomCommitPrefix();

        const { data, error } = await supabase
            .from('comments')
            .insert([{ username, message, hash, prefix }])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ comment: data, source: 'supabase' }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}
