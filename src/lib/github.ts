// GitHub API utilities

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    private: boolean;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    if (!username) {
        return [];
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        console.log(`[GitHub] Fetching repos for ${username}. Token present: ${!!token}`);

        const endpoint = token
            ? "https://api.github.com/user/repos?sort=updated&per_page=100&type=all"
            : `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`;

        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3+json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, {
            headers,
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`[GitHub] API error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`[GitHub] Error details: ${text}`);
            return [];
        }

        const repos: GitHubRepo[] = await response.json();
        console.log(`[GitHub] Fetched ${repos.length} repos.`);

        // Filter out forks and sort by stars (or updated if preferred)
        // If searching private, we might want to see them all, so less filtering?
        // Let's keep the .github filter.
        return repos
            .filter((repo) => !repo.name.includes(".github"))
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return [];
    }
}

export function formatReposAsJson(repos: GitHubRepo[]): string {
    const formatted = repos.map((repo) => ({
        name: repo.name,
        is_private: repo.private,
        description: repo.description || "No description",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        url: repo.html_url,
        homepage: repo.homepage || null,
        topics: repo.topics,
        last_updated: repo.pushed_at,
    }));

    return JSON.stringify({ projects: formatted, meta: { total: formatted.length, source: "github" } }, null, 2);
}
