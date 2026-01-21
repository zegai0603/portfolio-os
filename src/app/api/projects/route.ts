import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { fetchGitHubRepos } from '@/lib/github';

// GET - Return projects from GitHub
export async function GET() {
    const repos = await fetchGitHubRepos(config.githubUsername);

    const projects = repos.map((repo) => ({
        name: repo.name,
        description: repo.description || "No description",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        url: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics,
        last_updated: repo.pushed_at,
    }));

    return NextResponse.json({
        projects,
        meta: {
            total: projects.length,
            source: "github",
        },
    });
}
