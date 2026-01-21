import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";
import { fetchGitHubRepos, formatReposAsJson } from "@/lib/github";

export default async function ProjectsPage() {
  const repos = await fetchGitHubRepos(config.githubUsername);
  const content = repos.length > 0
    ? formatReposAsJson(repos)
    : `{
  "error": "No GitHub username configured",
  "message": "Please set NEXT_PUBLIC_GITHUB_USERNAME in your .env.local file"
}`;

  return (
    <CodeEditor code={content} language="json" />
  );
}
