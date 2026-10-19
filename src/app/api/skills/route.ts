import { NextResponse } from 'next/server';
import { profile } from '@/lib/profile';

// GET - Return grouped skills from the profile
export async function GET() {
    return NextResponse.json({
        skills: profile.skillGroups,
        meta: {
            total: profile.skillGroups.length,
            source: 'profile',
        },
    });
}
