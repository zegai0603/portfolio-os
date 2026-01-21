// Personal configuration - reads from environment variables

export const config = {
    // Personal Info
    name: process.env.NEXT_PUBLIC_NAME || "",
    title: process.env.NEXT_PUBLIC_TITLE || "",
    location: process.env.NEXT_PUBLIC_LOCATION || "",
    email: process.env.NEXT_PUBLIC_EMAIL || "",
    bio: process.env.NEXT_PUBLIC_BIO || "",

    // Social Links
    github: process.env.NEXT_PUBLIC_GITHUB || "",
    githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "",

    // Skills (comma-separated in env, parsed to array)
    languages: (process.env.NEXT_PUBLIC_LANGUAGES || "").split(",").filter(Boolean),
    currentFocus: process.env.NEXT_PUBLIC_CURRENT_FOCUS || "",

    // Hobbies (comma-separated)
    hobbies: (process.env.NEXT_PUBLIC_HOBBIES || "").split(",").filter(Boolean),

    // Advanced Configuration
    avatarUrl: process.env.NEXT_PUBLIC_AVATAR_URL || "",
    showErrorState: process.env.NEXT_PUBLIC_SHOW_ERROR_STATE === "true",

    // Detailed Skills Data
    skillsData: parseSkillsData(process.env.NEXT_PUBLIC_SKILLS_DATA),
};

function parseSkillsData(jsonString?: string) {
    if (!jsonString) return [];
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse skills data", e);
        return [];
    }
}

export type Config = typeof config;
