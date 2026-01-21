import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

// GET - Return intro data as JSON for frontend app
export async function GET() {
    return NextResponse.json({
        name: config.name,
        title: config.title,
        bio: config.bio,
        location: config.location,
        languages: config.languages,
        hobbies: config.hobbies,
        currentFocus: config.currentFocus,
        social: {
            github: config.github,
            linkedin: config.linkedin,
            instagram: config.instagram,
            email: config.email,
        },
    });
}
