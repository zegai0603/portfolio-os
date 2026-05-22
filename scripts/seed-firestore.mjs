import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const envPath = resolve(process.cwd(), ".env.local");

function loadLocalEnv() {
  try {
    const file = readFileSync(envPath, "utf8");

    for (const line of file.split("\n")) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex);
      const value = trimmed.slice(separatorIndex + 1).replace(/^"|"$/g, "");

      process.env[key] ||= value;
    }
  } catch {
    throw new Error(`Missing ${envPath}. Add your Firebase web config first.`);
  }
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

function readServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccountPath = resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
    return JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  }

  throw new Error(
    "Missing admin credentials. Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service account JSON file path."
  );
}

function getSkillsSeed() {
  const skillsData = process.env.NEXT_PUBLIC_SKILLS_DATA;

  if (skillsData) {
    try {
      const parsed = JSON.parse(skillsData);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((skill) => ({
          name: skill.name,
          level: typeof skill.level === "number" && skill.level > 1 ? skill.level / 100 : skill.level,
          status: skill.status || "Active",
          memory_usage: skill.memory_usage || "Low",
        }));
      }
    } catch {
      console.warn("Could not parse NEXT_PUBLIC_SKILLS_DATA. Falling back to NEXT_PUBLIC_LANGUAGES.");
    }
  }

  const languages = (process.env.NEXT_PUBLIC_LANGUAGES || "")
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean);

  const fallback = languages.length > 0
    ? languages
    : ["TypeScript", "React", "Next.js", "Firebase", "Tailwind CSS"];

  return fallback.map((name, index) => ({
    name,
    level: Math.max(95 - index * 5, 70) / 100,
    status: index < 3 ? "Stable" : "Active",
    memory_usage: "Low",
  }));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  loadLocalEnv();

  const projectId = requiredEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const serviceAccount = readServiceAccount();

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId,
    });
  }

  const db = getFirestore();
  const now = FieldValue.serverTimestamp();

  const blogPost = {
    slug: "vibecoding-portfolio",
    title: "Vibecoding this Portfolio",
    content: `# Vibecoding this Portfolio

This entire portfolio isn't just coded; it's **vibecoded**.

Built with the help of advanced AI agents, this OS-like interface blurs the line between a personal site and a functional desktop environment.

### The Stack
- **Next.js** for the framework
- **Firebase Firestore** for the backend
- **Tailwind CSS** for the styling
- **Vibes** for the soul

It's not about the lines of code, it's about the *feeling* of the interface. This terminal you're reading this on? It's a vibe.

\`\`\`bash
npm run vibecode
\`\`\`
`,
    created_at: now,
  };

  const starterComment = {
    username: "System",
    message: "Firestore is connected.",
    hash: "f1e2d3c",
    prefix: "feat",
    created_at: now,
  };

  await db.collection("blog_posts").doc(blogPost.slug).set(blogPost, { merge: true });

  for (const skill of getSkillsSeed()) {
    await db.collection("skills").doc(slugify(skill.name)).set({
      ...skill,
      created_at: now,
    }, { merge: true });
  }

  await db.collection("comments").doc(starterComment.hash).set(starterComment, { merge: true });

  console.log("Seeded Firestore collections: blog_posts, skills, comments");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
