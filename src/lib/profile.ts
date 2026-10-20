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
    title: "Computer Science @ SMU · Software Engineering Intern @ Flycatcher",
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
        { group: "Frameworks", items: ["React", "React Native", "Next.js", "Spring Boot", "FastAPI"] },
        { group: "Data & infra", items: ["PostgreSQL", "Supabase", "Kafka", "Dagster", "Docker", "AWS", "Terraform", "Prometheus"] },
        { group: "AI & quant", items: ["LLM apps (OpenAI, Gemini)", "FinBERT", "PyTorch", "CFR solvers", "Backtesting"] },
    ] as SkillGroup[],

    projects: [
        {
            slug: "flycatcher-taskgen",
            name: "Taskgen & PMS platform",
            tagline: "Rule-driven task generation and scheduling for 10,000+ bots, split into independent services.",
            role: "Flycatcher · Software Engineering Intern",
            period: "Aug 2025 – Oct 2026",
            stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Vercel"],
            highlights: [
                "Built taskgen, a sandboxed TS/JS rule runtime (1 s, 20-call, 300-row limits) letting operators ship strategies without deploys.",
                "Built its scheduler: a 168×168 timing model placing 1–7 actions a week for each of 10,000+ bots, on leased, fenced jobs.",
                "Split a 196K-line monolith into 5 independently deployed services with isolated databases, writing 67% of service commits.",
                "Built a seeded dry-run simulator replaying live rules across 50-account cohorts and 500-step timelines before release.",
                "Built a multi-entity finance module (transfers, FX, invoices, month-end close) for 3 companies in Next.js and Convex.",
            ],
            links: [],
            note: "Company work in private repositories.",
        },
        {
            slug: "personalities",
            name: "Personalities",
            tagline: "Stochastic agent simulator that generates realistic user populations and behaviour.",
            role: "Flycatcher · Software Engineering Intern",
            period: "Aug 2025 – Oct 2026",
            stack: ["Python"],
            highlights: [
                "Built an agent simulator of correlated player populations (Gaussian copula, 6 traits) driven by real traffic forecasts.",
                "Layered traffic, player and session models, with state-dependent betting, deposits and withdrawals per agent.",
            ],
            links: [],
            note: "Company work in a private repository.",
        },
        {
            slug: "rtp-testing",
            name: "RTP Testing",
            tagline: "Protocol-level data collection and verification for online games at scale.",
            role: "Flycatcher · Software Engineering Intern",
            period: "Aug 2025 – Oct 2026",
            stack: ["Selenium", "WebSockets"],
            highlights: [
                "Built protocol-level bots for JSON, form and WebSocket games with deterministic replay, measuring RTP across large samples.",
                "Built a Selenium network-capture scraper collecting metrics on 1,156 games from 19 providers, recovering RTP for 81.5%.",
            ],
            links: [],
            note: "Company work in a private repository.",
        },
        {
            slug: "poker-solver",
            name: "Poker Solver",
            tagline: "CFR and neural approaches to solving no-limit Hold'em spots.",
            role: "During Flycatcher internship",
            period: "Sep 2026 – Present",
            stack: ["Rust", "PyTorch", "Python"],
            highlights: [
                "Optimised a Rust CFR poker solver (up to 10.7% faster flop solves, identical outputs) and prototyped Deep CFR in PyTorch.",
                "Explored Deep CFR-style training for 9/10-seat tournament play with ICM payouts.",
            ],
            links: [],
            note: "Private repository.",
        },
        {
            slug: "airap-easi",
            name: "EASI commerce platform",
            tagline: "Spirits e-commerce with a guest storefront, trade pricing and field-sales apps.",
            role: "AIRAP · Software Engineering Intern",
            period: "Jun 2026 – Jul 2026",
            stack: ["React", "React Native", "Supabase", "Stripe", "FastAPI"],
            highlights: [
                "Built a guest liquor storefront with 3-step Stripe checkout, age gate and 13 row-level security policies, covered by 51 tests.",
                "Automated trade-profit pricing for 402 SKUs with margin-based approvals, plus a Firecrawl feed tracking 6 retailers' prices.",
                "Maintained a React Native app and 4 web portals inherited from a departing engineer, shipping pickup ordering and MFA.",
                "Built 9 FastAPI endpoints for RFQs and shipments and a leased AI-agent job queue for an aviation-parts marketplace.",
            ],
            links: [],
            note: "Client work in private repositories.",
        },
        {
            slug: "pxt-hiring",
            name: "Hiring game & scraping engine",
            tagline: "Game-based hiring assessment and a fast web scraping engine.",
            role: "PXT Equity · Software Engineering Intern",
            period: "Jun 2025 – Aug 2025",
            stack: ["Next.js", "Convex", "Puppeteer"],
            highlights: [
                "Built a parallel Puppeteer scraping engine that intercepted network responses to skip rendering, feeding profitability models.",
                "Built the Strategy-intern assessment and card-game UI for a 3-game hiring test, plus bulk hire and reject for recruiters.",
            ],
            links: [],
            note: "Company work in private repositories.",
        },
        {
            slug: "polyharvester",
            name: "Polyharvester",
            tagline: "Low-latency Rust trading system for Polymarket prediction markets.",
            period: "May 2026 – Present",
            stack: ["Rust", "AWS", "Prometheus", "React"],
            highlights: [
                "Built a 79K-line Rust trading runtime for Polymarket (18 crates, 539 tests) with order books, risk checks and kill switches.",
                "Captured 11.9M order-book rows (9.2 GB, 2,544 hash-sealed segments) on AWS, passing a 100% integrity audit.",
                "Tested 4 edge families with deterministic backtests and paper trading, pricing 348 of 354 fee-free markets.",
            ],
            links: [],
            note: "Private repository. Happy to walk through the code in an interview.",
        },
        {
            slug: "contextual",
            name: "Contextual",
            tagline: "Deterministic equity research pipeline covering 1,420 US companies.",
            period: "Sep 2026 – Present",
            stack: ["Python", "Dagster", "PostgreSQL", "FastAPI", "Next.js"],
            highlights: [
                "Built a deterministic equity research pipeline on Dagster (9 jobs, 9 schedules) running reverse-DCF valuation on SEC filings.",
                "Ran a point-in-time backtest over 1,404 companies, 93 month-ends (2019–2026) and 38,588 filings without look-ahead bias.",
                "Raised eligible-company coverage 2.5x (573 → 1,420), processing 60–140 companies an hour.",
            ],
            links: [],
            note: "Private repository. Happy to walk through the code in an interview.",
        },
        {
            slug: "strategy-research-factory",
            name: "Strategy Research Factory",
            tagline: "Overfitting-resistant research pipeline for ETF trading strategies.",
            period: "Sep 2026 – Present",
            stack: ["Python", "pandas", "vectorbt", "Alpaca"],
            highlights: [
                "Screened 9,256 ETF trading rules from 11 families through Deflated Sharpe, PBO and pre-registered holdout gates.",
                "Exposed overfitting (Sharpe 2.60 in-sample vs −0.27 out-of-sample); no rule beat the passive basket's 1.96 Sharpe.",
                "Now paper-trading a pre-registered 16-ETF portfolio in a $100K Alpaca account with monthly rebalancing.",
            ],
            links: [],
            note: "Private repository.",
        },
        {
            slug: "scrooge-crm",
            name: "Scrooge CRM",
            tagline: "Wealth-banking CRM with AI copilots for relationship managers.",
            role: "CS301 team project",
            period: "Sep 2026 – Present",
            stack: ["Java", "Spring Boot", "React", "TypeScript", "AWS", "Terraform"],
            highlights: [
                "Built a wealth-banking CRM on Spring Boot, React and AWS: 120 API operations, 82 DB migrations and 370+ tests.",
                "Enforced client isolation for an LLM copilot through typed read-only tools over Postgres row-level security.",
                "Lifted copilot promise extraction from 30/33 to 33/33 at $0.002 a call using an eval harness on the app's real prompts.",
                "Defined 172 Terraform AWS resources (WAF, DNS firewall, KMS, AgentCore) verified by 95 test assertions.",
            ],
            links: [],
            note: "University team project in a private repository.",
        },
        {
            slug: "crypto-sentiment",
            name: "Crypto Sentiment Trader",
            tagline: "Streaming pipeline that measures which social and news sources lead crypto prices.",
            role: "CS464 project",
            period: "Jan 2026 – May 2026",
            stack: ["Python", "Kafka", "FastAPI", "TimescaleDB", "FinBERT"],
            highlights: [
                "Built a 5-service Kafka pipeline ingesting Reddit, StockTwits, news and Binance data with transactional-outbox delivery.",
                "Scored sentiment with FinBERT, escalating only uncertain or high-impact posts to an LLM to cut cost and latency.",
                "Scored each source's lead over price with lead-lag cross-correlation and significance tests, updating reliability online.",
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
                "Built a bilingual finance and productivity app on Firebase with scheduled Cloud Functions and Telegram reminders.",
                "Built Telegram task notifications with a once-a-day delivery guard.",
            ],
            links: [],
            note: "Private repository.",
        },
    ] as Project[],
};
