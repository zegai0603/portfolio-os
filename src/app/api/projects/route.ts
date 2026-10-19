import { NextResponse } from 'next/server';
import { profile } from '@/lib/profile';

// GET - Return the curated project list
export async function GET() {
    return NextResponse.json({
        projects: profile.projects,
        meta: {
            total: profile.projects.length,
            source: "profile",
        },
    });
}
