import { initializeApp, getApp, getApps } from "firebase/app";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    where,
    type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

export const firebaseApp = isFirebaseConfigured
    ? getApps().length > 0
        ? getApp()
        : initializeApp(firebaseConfig)
    : null;

export const db: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;

export interface Comment {
    id: string;
    username: string;
    message: string;
    hash?: string;
    prefix?: string;
    created_at: string;
    parent_id?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    repo_url?: string;
    live_url?: string;
    image_url?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string;
    created_at: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number;
    status: "Stable" | "Active" | "Experimental";
    memory_usage: "Low" | "Medium" | "High";
}

type FirebaseResult<T> = {
    data: T | null;
    error: Error | null;
};

function missingFirebaseError() {
    return new Error("Firebase is not configured");
}

function normalizeDate(value: unknown): string {
    if (value instanceof Timestamp) {
        return value.toDate().toISOString();
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "string") {
        return value;
    }

    return new Date().toISOString();
}

function normalizeComment(id: string, value: Record<string, unknown>): Comment {
    return {
        id,
        username: typeof value.username === "string" ? value.username : "Guest",
        message: typeof value.message === "string" ? value.message : "",
        hash: typeof value.hash === "string" ? value.hash : undefined,
        prefix: typeof value.prefix === "string" ? value.prefix : undefined,
        created_at: normalizeDate(value.created_at),
        parent_id: typeof value.parent_id === "string" ? value.parent_id : undefined,
    };
}

function normalizeBlogPost(id: string, value: Record<string, unknown>): BlogPost {
    return {
        id,
        slug: typeof value.slug === "string" ? value.slug : "",
        title: typeof value.title === "string" ? value.title : "",
        content: typeof value.content === "string" ? value.content : "",
        created_at: normalizeDate(value.created_at),
    };
}

function normalizeSkill(id: string, value: Record<string, unknown>): Skill {
    const rawLevel = typeof value.level === "number" ? value.level : 0;

    return {
        id,
        name: typeof value.name === "string" ? value.name : "",
        level: rawLevel > 1 ? rawLevel / 100 : rawLevel,
        status: value.status === "Stable" || value.status === "Experimental" ? value.status : "Active",
        memory_usage: value.memory_usage === "Medium" || value.memory_usage === "High" ? value.memory_usage : "Low",
    };
}

export async function addComment(
    message: string,
    username: string = "Guest",
    overrides: Partial<Pick<Comment, "hash" | "prefix">> = {}
): Promise<FirebaseResult<Comment>> {
    if (!db) {
        return { data: null, error: missingFirebaseError() };
    }

    try {
        const hash = overrides.hash || Math.random().toString(16).substring(2, 9);
        const prefix = overrides.prefix || "feat";
        const comment = {
            username,
            message,
            hash,
            prefix,
            created_at: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "comments"), comment);

        return {
            data: {
                id: docRef.id,
                username,
                message,
                hash,
                prefix,
                created_at: new Date().toISOString(),
            },
            error: null,
        };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

export async function getComments(): Promise<FirebaseResult<Comment[]>> {
    if (!db) {
        return { data: [], error: null };
    }

    try {
        const commentsQuery = query(
            collection(db, "comments"),
            orderBy("created_at", "desc"),
            limit(50)
        );
        const snapshot = await getDocs(commentsQuery);
        const comments = snapshot.docs.map((docSnapshot) =>
            normalizeComment(docSnapshot.id, docSnapshot.data())
        );

        return { data: comments, error: null };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

export async function getBlogPosts(): Promise<FirebaseResult<BlogPost[]>> {
    if (!db) {
        return { data: [], error: null };
    }

    try {
        const postsQuery = query(
            collection(db, "blog_posts"),
            orderBy("created_at", "desc")
        );
        const snapshot = await getDocs(postsQuery);
        const posts = snapshot.docs.map((docSnapshot) =>
            normalizeBlogPost(docSnapshot.id, docSnapshot.data())
        );

        return { data: posts, error: null };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

export async function getBlogPostBySlug(slug: string): Promise<FirebaseResult<BlogPost>> {
    if (!db) {
        return { data: null, error: null };
    }

    try {
        const postsQuery = query(
            collection(db, "blog_posts"),
            where("slug", "==", slug),
            limit(1)
        );
        const snapshot = await getDocs(postsQuery);
        const post = snapshot.docs[0];

        return {
            data: post ? normalizeBlogPost(post.id, post.data()) : null,
            error: null,
        };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

export async function getSkills(): Promise<FirebaseResult<Skill[]>> {
    if (!db) {
        return { data: [], error: null };
    }

    try {
        const skillsQuery = query(
            collection(db, "skills"),
            orderBy("level", "desc")
        );
        const snapshot = await getDocs(skillsQuery);
        const skills = snapshot.docs.map((docSnapshot) =>
            normalizeSkill(docSnapshot.id, docSnapshot.data())
        );

        return { data: skills, error: null };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}
