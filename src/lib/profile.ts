// Recruiter-facing content for the whole site. Edit here; it no longer comes from Vercel env vars or GitHub.

export interface ProjectLink {
    label: string;
    url: string;
}

export interface Project {
    slug: string;
    name: string;
    tagline: string;
    role?: string;
    period: string;
    stack: string[];
    highlights: string[];
    links: ProjectLink[];
    // Shown instead of links when the code can't be shared publicly.
    note?: string;
}

export interface SkillGroup {
    group: string;
    items: string[];
}

export const profile = {
    name: "Zhe Khai Tew",
    title: "Computer Science @ SMU · Intern Developer @ Flycatcher",
    location: "Singapore",
    bio: "Computer Science student at Singapore Management University (graduating 2028). I build trading systems, data platforms and full-stack products.",
    currentFocus: "Low-latency trading systems and data platforms; looking for 2027 software engineering internships",
    email: "zhekhai.tew@gmail.com",
    github: "https://github.com/zegai0603",
    githubUsername: "zegai0603",
    linkedin: "https://www.linkedin.com/in/zhekhai",
    linkedinHandle: "in/zhekhai",
    // Set to e.g. "/resume.pdf" after adding the file to public/; the resume link stays hidden while empty.
    resumeUrl: "",
    hobbies: ["Basketball", "Gaming", "Karaoke"],

    skillGroups: [
        { group: "Languages", items: ["TypeScript", "Python", "Java", "Rust", "SQL", "C"] },
        { group: "Frameworks", items: ["React", "Next.js", "Spring Boot", "FastAPI"] },
        { group: "Data & infra", items: ["PostgreSQL", "Kafka", "Dagster", "Docker", "AWS", "Terraform"] },
        { group: "AI", items: ["LLM apps (OpenAI, Gemini)", "FinBERT"] },
    ] as SkillGroup[],

    projects: [
        {
            slug: "polyharvester",
            name: "Polyharvester",
            tagline: "Low-latency Rust trading system for Polymarket prediction markets.",
            period: "May 2026 – Present",
            stack: ["Rust", "AWS", "WebSockets"],
            highlights: [
                "Built a Rust trading engine with in-memory order books, WebSocket feeds, risk checks and kill switches.",
                "Built deterministic backtests and paper-trading simulations of latency, liquidity, queue position and settlement costs.",
                "Validated 11.9M captured market records across 2,544 segments with sequence checks and checksums.",
            ],
            links: [],
            note: "Private repository. Happy to walk through the code in an interview.",
        },
        {
            slug: "contextual",
            name: "Contextual",
            tagline: "Event-driven equity research platform covering 1,420 US companies.",
            period: "Sep 2026 – Present",
            stack: ["Python", "Dagster", "PostgreSQL", "FastAPI", "OpenAI"],
            highlights: [
                "Built a Python platform that ingests SEC filings, extracts company events with OpenAI and runs scheduled valuation scans.",
                "Implemented point-in-time backtesting that replays the full pipeline on past dates to prevent look-ahead bias.",
                "Raised the pipeline's eligible-company coverage from 573 to 1,420.",
            ],
            links: [],
            note: "Private repository. Happy to walk through the code in an interview.",
        },
        {
            slug: "scrooge-crm",
            name: "Scrooge CRM",
            tagline: "Wealth-banking CRM with AI copilots for relationship managers.",
            role: "Team lead · CS301 · team of 7",
            period: "Sep 2026 – Present",
            stack: ["Java", "Spring Boot", "React", "TypeScript", "AWS", "Terraform"],
            highlights: [
                "Built a CRM with three AI features on Spring Boot (Java 21), React and Terraform-defined AWS.",
                "Built LLM research agents that investigate a client's source of wealth from public records.",
                "Built a payment-screening detector that explains flagged transactions in plain English.",
            ],
            links: [],
            note: "University team project in a private repository.",
        },
        {
            slug: "geoguard",
            name: "GeoGuard AI",
            tagline: "LLM tool that flags software features needing geo-specific legal compliance.",
            role: "Hackathon team project · team of 5",
            period: "Aug 2025",
            stack: ["Python", "Gemini", "Streamlit", "Supabase"],
            highlights: [
                "Built Gemini-based analysis over a curated legal knowledge base that flags features needing region-specific logic and cites the law.",
                "Saved every scan as an immutable snapshot, giving legal teams an auditable compliance history.",
            ],
            links: [
                { label: "live demo", url: "https://geoguard-t4.streamlit.app/" },
                { label: "video", url: "https://youtu.be/hWW6oEj4Rv0" },
                { label: "github", url: "https://github.com/mattw23n/geoguard" },
            ],
        },
        {
            slug: "companion",
            name: "Companion",
            tagline: "Personal finance and task app with automated reminders, live on Firebase.",
            period: "Jul 2025 – Aug 2026",
            stack: ["React", "TypeScript", "Firebase"],
            highlights: [
                "Built scheduled Cloud Functions that promote due tasks, keep lifetime totals and back up Firestore daily.",
                "Built Telegram task notifications with a once-a-day delivery guard.",
            ],
            links: [],
            note: "Private repository.",
        },
        {
            slug: "crypto-sentiment",
            name: "Crypto Sentiment Trader",
            tagline: "Real-time pipeline that scores social and news sentiment against crypto prices.",
            role: "CS464 project",
            period: "Jan 2026 – May 2026",
            stack: ["Python", "Kafka", "FastAPI", "TimescaleDB", "FinBERT"],
            highlights: [
                "Built a real-time Kafka, TimescaleDB and FastAPI pipeline ingesting Reddit, news, StockTwits and Binance data.",
                "Built FinBERT sentiment scoring with LLM validation for high-impact events.",
                "Measured each source's predictive power with decay-weighted cross-correlation and significance tests.",
            ],
            links: [],
            note: "University team project in a private repository.",
        },
    ] as Project[],
};
