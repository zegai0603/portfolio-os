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
  // Real images only, each backing a claim; the alt text doubles as the caption. A project without any shows no image row.
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
const NOT_PUBLIC = "The code isn't public.";

export const items: Item[] = [
  {
    id: "fly",
    lane: "work",
    name: "Flycatcher",
    when: "Software Engineering Intern, Aug 2025 – Oct 2026",
    what: "Built poker solvers and systems behind 10,000+ bots.",
    start: "2025-08",
    end: "2026-10",
    bits: [
      "Built taskgen, a sandboxed rule runtime, so operators change bot behaviour without a redeploy",
      "Built a scheduler timing 10,000+ bots’ weekly actions",
      "Built a preflop poker solver gaining +2.5–3.4 BB/100 per seat over the previous checkpoint",
      "Split a monolith into deployed microservices and redesigned auth around them",
    ],
    links: [],
    note: COMPANY,
  },
  {
    id: "airap",
    lane: "work",
    name: "AIRAP",
    when: "Software Engineering Intern, Jun – Jul 2026",
    what: "A mobile-optimised alcohol store used by real customers and staff.",
    start: "2026-06",
    end: "2026-07",
    bits: [
      "Built a liquor storefront over a 1,228-product catalogue with Stripe checkout and age checks",
      "Built a twice-weekly price collector for 6 rival retailers, matching products by barcode and exact variant",
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
    what: "Ran eBay and Etsy stores, plus fast data collection and a hiring test thousands of people took.",
    start: "2025-06",
    end: "2025-08",
    bits: [
      "Ran our eBay and Etsy stores from sourcing to shipping and refunds on Strustore, an internal ops platform",
      "Built Strustore’s inventory sync, pushing each stock change to every live eBay and Etsy listing",
      "Built a parallel scraper that skipped page rendering to collect 100,000+ listings a day",
      "Built the Four Piles card-game UI for a 3-game hiring test that screened 5,000+ applicants",
    ],
    links: [],
    note: COMPANY,
  },
  {
    id: "scrooge",
    lane: "projects",
    name: "Scrooge CRM",
    when: "School project, Sep 2026 – Present",
    what: "A wealth-banking CRM with an LLM copilot kept away from other clients’ data.",
    start: "2026-09",
    end: "present",
    bits: [
      "Built a wealth-banking CRM on Spring Boot, React and AWS",
      "Raised copilot promise-extraction accuracy from 91% to 100% at $0.002 a call via prompt fixes found with a model-comparison eval.",
    ],
    links: [],
    note: `University team project. ${NOT_PUBLIC}`,
    images: [
      { src: "/images/scrooge/01-radar-call-queue.png", alt: "My Relationship Radar: ranks clients to call and shows the payments behind each signal (fictional demo data)" },
      { src: "/images/scrooge/03-radar-aws-architecture.png", alt: "How Radar runs on the team's AWS stack: a Java API in two availability zones, Aurora, SQS and SES" },
    ],
  },
  {
    id: "geo",
    lane: "projects",
    name: "GeoGuard",
    when: "Hackathon project, Aug 2025",
    what: "An LLM tool that flags software features needing geo-specific legal compliance.",
    start: "2025-08",
    end: "2025-08",
    bits: [
      "Gemini analysis over a curated legal knowledge base, citing the law",
      "Immutable scan snapshots for an auditable compliance history",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/mattw23n/geoguard" },
      { label: "Video", url: "https://youtu.be/hWW6oEj4Rv0" },
    ],
    images: [
      { src: "/images/geoguard/geo-1-dashboard.png", alt: "The working dashboard: features scanned and the share that need compliance work, from our demo video" },
    ],
  },
  {
    id: "prize",
    lane: "projects",
    name: "Totally Fair Prize Converter",
    when: "Singapore Stupidhacks project, May 2026",
    what: 'A joke tool for hackathon organisers: it routes a prize through currency conversions and shows how much "budget surplus" appears.',
    start: "2026-05",
    end: "2026-05",
    bits: [
      "Compares the best FX route with the lowest one, on European Central Bank reference rates",
      "Runs Bellman-Ford on log rates to inspect profit and loss cycles",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/zegai0603/Totally-Fair-Prize-Converter",
      },
    ],
    images: [
      { src: "/images/prize-converter/prize-1-overview.png", alt: "The same 1,000 USD prize via the best and worst FX routes: the 31 SGD gap is the organiser's \"surplus\"" },
    ],
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
      "Budget and task tracking, with forecasting capability using over 3 months ago",
      "Serving a grand total of 5 live users",
    ],
    links: [],
    note: NOT_PUBLIC,
    images: [
      { src: "/images/companion/comp-1-today.png", alt: "Today view: a safe-to-spend figure from the month's budget, next to the day's tasks (demo data)" },
      { src: "/images/companion/comp-2-insights.png", alt: "Insights: spending by category and the month's spending pace (demo data)" },
    ],
  },
  {
    id: "factory",
    lane: "projects",
    name: "Strategy Factory",
    when: "Sep 2026 – Present",
    what: "Generating and testing rules that could beat holding SPY as a retail trader.",
    start: "2026-09",
    end: "present",
    bits: [
      "I tried 9,256 ETF rules across 3 runs, and none passed",
      "Selected mix: Sharpe 2.60 in-sample, −0.27 out of sample, against 1.79 for a passive basket before costs",
      "Even a pre-registered portfolio (1.87) trailed passive (1.96) on an untouched 2026 holdout",
      "Tested with Deflated Sharpe, PBO and fixed test splits",
    ],
    links: [],
    note: NOT_PUBLIC,
    images: [
      { src: "/images/strategy-factory/factory-three-runs.png", alt: "All 3 runs, 9,256 rules: every selected mix fell apart on the validation and test years" },
      { src: "/images/strategy-factory/factory-oos-collapse.png", alt: "The daily run's selected mix: Sharpe 2.60 in-sample, then flat, ending at −0.27 against passive's 1.79" },
      { src: "/images/strategy-factory/factory-holdout-2026.png", alt: "Pre-registered portfolio on the untouched 2026 holdout: Sharpe 1.87, still behind passive's 1.96" },
    ],
  },
  {
    id: "to-the-moon-2-equities",
    lane: "blogs",
    name: "To the Moon (2) - Equities",
    when: "Start of Oct 2026",
    what: "Testing a reverse DCF, company events and post-earnings drift on paper, with the results.",
    start: "2026-10",
    bits: [],
    links: [{ label: "Read", url: "/blog/to-the-moon-2-equities" }],
  },
  // Dates stop at the month, so this sits before Contextual to rank as the newer August item.
  {
    id: "to-the-moon-1-prediction-markets",
    lane: "blogs",
    name: "To the Moon (1) - Prediction Markets",
    when: "End of Aug 2026",
    what: "What three months of paper trading Polymarket taught me about checking the edge before building.",
    start: "2026-08",
    bits: [],
    links: [{ label: "Read", url: "/blog/to-the-moon-1-prediction-markets" }],
  },
  {
    id: "ctx",
    lane: "projects",
    name: "Contextual",
    when: "Aug 2026 – Present",
    what: "Another shot at beating holding SPY. A reverse-DCF screen of 1,420 US companies on SEC data.",
    start: "2026-08",
    end: "present",
    bits: [
      "7.5 years backtested point-in-time across 1,404 companies",
      "Raised analysable coverage 2.5x, from 573 to 1,420 companies",
      "Skips a company when inputs are missing: a wrong valuation is worse than none",
      "Next fix: the company list still has survivorship bias",
    ],
    links: [{ label: "Read the blog", url: "/blog/to-the-moon-2-equities" }],
    note: NOT_PUBLIC,
    images: [
      { src: "/images/contextual/reverse-dcf-backtest.svg", alt: "The 7.5-year backtest: +12.5% on average from 2019, but −0.8% from 2024 on, with a 56.9% worst drop" },
      { src: "/images/contextual/screen-funnel.svg", alt: "Skipping bad inputs: of 1,409 eligible companies on 24 Oct, only 521 had enough data to value" },
      { src: "/images/contextual/ctx-screen-track.png", alt: "Live since August: 73 flagged names were −2.2% against SPY after 40 sessions, and only 35% beat it" },
    ],
  },
  {
    id: "poly",
    lane: "projects",
    name: "Polyharvester",
    when: "May – Aug 2026",
    what: "A Rust trading system for Polymarket. Explored taker and maker arbitrages",
    start: "2026-05",
    end: "2026-08",
    bits: [
      "Paper trading showed +$106, which turned out to be a measurement artifact",
      "Infra before alpha mistake",
      "Streamed live order books from 692 markets",
      "Captured 11.9M rows with zero integrity failures",
      "No edge cleared its pre-registered gate after costs across 4 strategy families, so I kept live capital at zero and tore the infrastructure down",
    ],
    links: [{ label: "Read the blog", url: "/blog/to-the-moon-1-prediction-markets" }],
    note: NOT_PUBLIC,
    images: [
      { src: "/images/polyharvester/book-sums.svg", alt: "Why there was no arbitrage: a full set sold for about $0.99 and cost about $1.01, around the $1.00 it pays" },
      { src: "/images/polyharvester/rust-lines.svg", alt: "Infra before alpha: 61,000 lines of Rust existed before the order-book check that killed the idea" },
      { src: "/images/polyharvester/poly-ops-safety-gates.png", alt: "The operator console kept live trading off and dry run on, so no real capital was ever at risk" },
    ],
  },
  {
    id: "crypto",
    lane: "projects",
    name: "Crypto Sentiment Trader",
    when: "Jan – May 2026",
    what: "A school project scoring crypto sentiment and testing whether it leads price.",
    start: "2026-01",
    end: "2026-05",
    bits: [
      "5-service Kafka pipeline, with a transactional outbox so a crash between the database write and the publish can’t lose or invent events",
      "FinBERT first, escalating only uncertain or high-impact posts to an LLM",
    ],
    links: [],
    note: `University team project. ${NOT_PUBLIC}`,
    images: [
      { src: "/images/crypto-sentiment/02-service-architecture.png", alt: "The team's 5-service design: services pass events over Kafka topics into TimescaleDB" },
      { src: "/images/crypto-sentiment/01-operator-dashboard.png", alt: "The team's dashboard testing whether sentiment leads price: signal quality, timeline and a paper recommendation" },
    ],
  },
];
