import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { config } from '@/lib/config';

// GET - Fetch skills from config (Supabase optional)
export async function GET() {
    try {
        // Try Supabase first if configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (supabaseUrl) {
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('level', { ascending: false });

            if (!error && data && data.length > 0) {
                return NextResponse.json({
                    skills: data,
                    meta: {
                        total: data.length,
                        last_updated: new Date().toISOString(),
                        source: 'supabase',
                    },
                });
            }
        }

        // Fall back to config-based skills
        // Use skillsData from env if available, otherwise derive from languages
        const skills = config.skillsData.length > 0
            ? config.skillsData.map((s: { name: string; level: number; status?: string; memory_usage?: string }) => ({
                name: s.name,
                level: s.level / 100, // normalize to 0-1 for frontend
                status: s.status || 'Active',
                memory_usage: s.memory_usage || 'Low',
            }))
            : config.languages.map((lang, index) => ({
                name: lang,
                level: (95 - index * 5) / 100,
                status: index < 3 ? 'Stable' : 'Active',
                memory_usage: 'Low',
            }));

        return NextResponse.json({
            skills,
            meta: {
                total: skills.length,
                last_updated: new Date().toISOString(),
                source: 'config',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
            { status: 500 }
        );
    }
}
