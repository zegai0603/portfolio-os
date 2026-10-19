// Site configuration. Personal content lives in profile.ts so it is versioned with the code.
import { profile } from "./profile";

export const config = {
    // Personal Info
    name: profile.name,
    title: profile.title,
    location: profile.location,
    email: profile.email,
    bio: profile.bio,

    // Social Links
    github: profile.github,
    githubUsername: profile.githubUsername,
    linkedin: profile.linkedin,
    linkedinHandle: profile.linkedinHandle,
    resumeUrl: profile.resumeUrl,

    // Skills
    languages: profile.skillGroups.flatMap((g) => g.items),
    skillGroups: profile.skillGroups,
    currentFocus: profile.currentFocus,

    hobbies: profile.hobbies,

    // Advanced Configuration
    avatarUrl: process.env.NEXT_PUBLIC_AVATAR_URL || "",
    showErrorState: process.env.NEXT_PUBLIC_SHOW_ERROR_STATE === "true",
};

export type Config = typeof config;
