import { NextRequest, NextResponse } from 'next/server';
import { addComment, getComments, isFirebaseConfigured } from '@/lib/firebase';
import { generateCommitHash, getRandomCommitPrefix } from '@/lib/utils';

// GET - Fetch all comments (requires Firebase)
export async function GET() {
    try {
        if (!isFirebaseConfigured) {
            return NextResponse.json({
                comments: [],
                message: "Comments feature requires Firebase configuration",
                source: 'none',
            });
        }

        const { data, error } = await getComments();

        if (error) {
            return NextResponse.json({
                comments: [],
                error: error.message,
                source: 'firebase_error',
            });
        }

        return NextResponse.json({ comments: data, source: 'firebase' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST - Create a new comment (requires Firebase)
export async function POST(request: NextRequest) {
    try {
        if (!isFirebaseConfigured) {
            return NextResponse.json(
                { error: 'Comments feature requires Firebase configuration' },
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

        const { data, error } = await addComment(message, username, { hash, prefix });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ comment: data, source: 'firebase' }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}
