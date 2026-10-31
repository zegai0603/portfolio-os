// All site content lives here. Dates are "YYYY-MM"; the claims follow the resume's evidence notes.

export type Lane = "work" | "projects" | "blogs";

export interface Item {
    id: string;
    lane: Lane;
    name: string;
    when: string;
    what: string;
    start: string;
    // Last month worked on, "present", or left out for a single-date item such as a post.
    end?: string;
    bits: string[];
    links: { label: string; url: string }[];
    // Shown under the links when there is no public repo.
    note?: string;
    // Real images only: a project without any shows no image row.
    images?: { src: string; alt: string }[];
}

export const contact = {
    name: "Zhe Khai Tew",
    email: "zhekhai.tew@gmail.com",
    github: "https://github.com/zegai0603",
    linkedin: "https://www.linkedin.com/in/zhekhai",
};

// Bump `to` when updating the site: "present" items run up to it.
export const axis = { from: "2025-06", to: "2026-11" };

const COMPANY = "Company code, so there is no public repo.";
const PRIVATE = "The code is in a private repo.";

export const items: Item[] = [
    {
        id: "fly",
        lane: "work",
        name: "Flycatcher",
        when: "Software Engineering Intern, Aug 2025 – Oct 2026",
        what: "Built the systems behind 10,000+ bots.",
        start: "2025-08",
        end: "2026-10",
        bits: [
            "Built taskgen, a sandboxed rule runtime, so operators change bot behaviour without a redeploy",
            "Built a scheduler timing 10,000+ bots’ weekly actions",
            "Built a preflop poker solver gaining +2.5–3.4 BB/100 per seat",
        ],
        links: [],
        note: COMPANY,
    },
    {
        id: "airap",
        lane: "work",
        name: "AIRAP",
        when: "Software Engineering Intern, Jun – Jul 2026",
        what: "Shipped for real customers and staff, on code I inherited.",
        start: "2026-06",
        end: "2026-07",
        bits: [
            "Built a liquor storefront for 1,228 products with Stripe checkout and age checks",
            "Built quote pricing with sign-off for loss-making quotes",
            "Maintained a React Native app and 4 web portals used by up to 30 staff",
        ],
        links: [],
        note: COMPANY,
    },
    {
        id: "pxt",
        lane: "work",
        name: "PXT Equity",
        when: "Software Engineering Intern, Jun – Aug 2025",
        what: "Fast data collection, and a hiring test thousands of people took.",
        start: "2025-06",
        end: "2025-08",
        bits: [
            "Built a parallel scraper that skipped page rendering to collect 100,000+ listings a day",
            "Built the card-game UI for a hiring test that screened 5,000+ applicants",
        ],
        links: [],
        note: COMPANY,
    },
    {
        id: "scrooge",
        lane: "projects",
        name: "Scrooge CRM",
        when: "CS301 team project, Sep 2026 – Present",
        what: "A wealth-banking CRM with an LLM copilot kept away from other clients’ data.",
        start: "2026-09",
        end: "present",
        bits: [
            "120 API operations, 82 DB migrations and 370+ tests",
            "Typed read-only tools over Postgres row-level security",
            "170+ Terraform AWS resources verified by 95 test assertions",
        ],
        links: [],
        note: "University team project in a private repo.",
    },
    {
        id: "geo",
        lane: "projects",
        name: "GeoGuard",
        when: "Hackathon team of 5, Aug 2025",
        what: "An LLM tool that flags software features needing geo-specific legal compliance.",
        start: "2025-08",
        end: "2025-08",
        bits: [
            "Gemini analysis over a curated legal knowledge base, citing the law",
            "Immutable scan snapshots for an auditable compliance history",
        ],
        links: [
            { label: "GitHub", url: "https://github.com/mattw23n/geoguard" },
            { label: "Live demo", url: "https://geoguard-t4.streamlit.app/" },
            { label: "Video", url: "https://youtu.be/hWW6oEj4Rv0" },
        ],
    },
    {
        id: "prize",
        lane: "projects",
        name: "Totally Fair Prize Converter",
        when: "May 2026",
        what: "The prize payout tool no participant asked for. It routes a hackathon prize through creative currency conversions and shows how much \"budget surplus\" appears.",
        start: "2026-05",
        end: "2026-05",
        bits: [
            "Compares the best FX route with the lowest one",
            "Generates tiny excuses like \"The route took a tiny bite.\"",
        ],
        links: [{ label: "GitHub", url: "https://github.com/zegai0603/Totally-Fair-Prize-Converter" }],
    },
    {
        id: "comp",
        lane: "projects",
        name: "Companion",
        when: "Jul 2025 – Aug 2026",
        what: "A personal finance and task app with automated reminders, live on Firebase.",
        start: "2025-07",
        end: "2026-08",
        bits: [
            "Bilingual, with scheduled Cloud Functions",
            "Telegram reminders with a once-a-day delivery guard",
        ],
        links: [],
        note: PRIVATE,
    },
    {
        id: "factory",
        lane: "projects",
        name: "Strategy Factory",
        when: "Sep 2026 – Present",
        what: "My favourite result is a bad one. I tried 9,256 ETF rules across 3 runs, and none passed.",
        start: "2026-09",
        end: "present",
        bits: [
            "Sharpe 2.60 in-sample, −0.27 out of sample",
            "Tested with Deflated Sharpe, PBO and fixed holdouts",
        ],
        links: [],
        note: PRIVATE,
    },
    {
        id: "ctx",
        lane: "projects",
        name: "Contextual",
        when: "Aug 2026 – Present",
        what: "A reverse-DCF screen of 1,420 US companies on SEC data.",
        start: "2026-08",
        end: "present",
        bits: [
            "7.5 years backtested point-in-time across 1,404 companies",
            "Raised analysable coverage 2.5x, from 573 to 1,420 companies",
            "Next fix: the company list still has survivorship bias",
        ],
        links: [],
        note: PRIVATE,
    },
    {
        id: "poly",
        lane: "projects",
        name: "Polyharvester",
        when: "May – Aug 2026",
        what: "A Rust trading system for Polymarket. Paper trading showed +$106, which turned out to be a measurement artifact.",
        start: "2026-05",
        end: "2026-08",
        bits: [
            "Streamed live order books from 692 markets",
            "Captured 11.9M rows with zero integrity failures",
            "No edge survived costs across 4 strategy families, so live capital stayed at zero",
        ],
        links: [],
        note: PRIVATE,
    },
    {
        id: "crypto",
        lane: "projects",
        name: "Crypto Sentiment Trader",
        when: "Jan – May 2026",
        what: "A question about cost: can a cheap model handle most posts, and an LLM only the hard ones?",
        start: "2026-01",
        end: "2026-05",
        bits: [
            "5-service Kafka pipeline with transactional-outbox delivery",
            "FinBERT first, escalating only uncertain or high-impact posts to an LLM",
        ],
        links: [],
        note: PRIVATE,
    },
    {
        id: "vibe",
        lane: "blogs",
        name: "Vibecoding this Portfolio",
        when: "May 2026",
        what: "How the first version of this site was built with Next.js, Firebase, Tailwind CSS and AI agents.",
        start: "2026-05",
        bits: [],
        links: [{ label: "Read", url: "/blog/vibecoding-portfolio" }],
    },
];
