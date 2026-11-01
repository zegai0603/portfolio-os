"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { axis, items, type Item, type Lane } from "@/lib/profile";

const monthIndex = (ym: string) => {
    const [year, month] = ym.split("-").map(Number);
    return year * 12 + month;
};
const FROM = monthIndex(axis.from);
const TO = monthIndex(axis.to) + 1;
const YEAR_2026 = monthIndex("2026-01");

const startOf = (i: Item) => monthIndex(i.start);
const endOf = (i: Item) => (i.end === "present" ? TO : i.end ? monthIndex(i.end) + 1 : startOf(i));
const startLabel = (i: Item) => {
    const [year, month] = i.start.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

// The plot runs down the page, newest first: each item has its own row, and each lane is a column.
// Only one lane is open at a time. Closed lanes show their points alone, with no labels.
// A lane appears with its first item.
const LANES = (
    [
        ["work", "WORK"],
        ["projects", "PROJECTS"],
        ["blogs", "BLOGS"],
    ] as [Lane, string][]
).filter(([lane]) => items.some((i) => i.lane === lane));
const ROWS = [...items].sort((a, b) => startOf(b) - startOf(a));
const HEADER_HEIGHT = 44;
const ROW_HEIGHT = 44;
// On desktop the rows share out the height the dial leaves, so the left column fills the window.
const rowHeight = `calc((100% - ${HEADER_HEIGHT}px) / ${ROWS.length})`;
const DATE_WIDTH = 54;
const CLOSED_WIDTH = 44;
const POINT_X = 16;
const rowY = (i: Item, offset = 0) => `calc(${HEADER_HEIGHT}px + (100% - ${HEADER_HEIGHT}px) * ${(ROWS.indexOf(i) + offset) / ROWS.length})`;
const laneIndex = (lane: Lane) => LANES.findIndex(([id]) => id === lane);
// Lanes before the open one stack on the left, and lanes after it stack on the right.
const laneLeft = (index: number, open: number) =>
    index <= open ? `${DATE_WIDTH + index * CLOSED_WIDTH}px` : `calc(100% - ${(LANES.length - index) * CLOSED_WIDTH}px)`;
const laneWidth = (index: number, open: number) =>
    index === open ? `calc(100% - ${DATE_WIDTH + (LANES.length - 1) * CLOSED_WIDTH}px)` : `${CLOSED_WIDTH}px`;

// The dial shows the same items as a circle: month sets the angle, and each project keeps its own ring.
const CENTRE = 160;
const OUTER_RING = 130;
const RING_GAP = 6;
const SWEEP = 270;
const angleOf = (m: number) => ((m - FROM) / (TO - FROM)) * SWEEP;
const polar = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(CENTRE + r * Math.sin(a)).toFixed(1)} ${(CENTRE - r * Math.cos(a)).toFixed(1)}`;
};

const RINGS: Record<string, number> = {};
let nextRing = OUTER_RING;
const RING_LABELS = LANES.map(([lane, label]) => {
    const first = nextRing;
    items
        .filter((i) => i.lane === lane && i.end)
        .sort((a, b) => startOf(a) - startOf(b))
        .forEach((i) => {
            RINGS[i.id] = nextRing;
            nextRing -= RING_GAP;
        });
    const y = CENTRE - (first + nextRing + RING_GAP) / 2 + 4;
    nextRing -= RING_GAP;
    return { label, y };
});
// Posts are single dates with no span, so they share one ring as dots.
const POST_RING = nextRing + RING_GAP;
const ringOf = (i: Item) => RINGS[i.id] ?? POST_RING;

const arcOf = (i: Item) => {
    const r = ringOf(i);
    if (!i.end) return `M${polar(r, angleOf(startOf(i)))}h.01`;
    const [from, to] = [angleOf(startOf(i)), angleOf(endOf(i))];
    return `M${polar(r, from)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${polar(r, to)}`;
};

const [yearX, yearY] = polar(OUTER_RING + 8, angleOf(YEAR_2026)).split(" ");

function Details({ item }: { item: Item }) {
    return (
        <div className="flex flex-col gap-2.5">
            <h2 className="font-display text-[40px] leading-[1.06] font-extralight tracking-[-0.04em] text-white lg:text-[56px]">{item.name}</h2>
            <p className="text-xs">{item.when}</p>
            <p className="mt-1.5 max-w-[62ch] text-[19px] text-white">{item.what}</p>
            {item.bits.map((bit) => (
                <p key={bit} className="text-[15px]">— {bit}</p>
            ))}
            <div className="mt-2 flex flex-wrap gap-2">
                {item.links.map((link) => (
                    <a
                        key={link.url}
                        href={link.url}
                        {...(link.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="inline-flex min-h-11 items-center border border-white px-3.5 text-white hover:bg-white hover:text-black"
                    >
                        {link.label} ↗
                    </a>
                ))}
            </div>
            {item.note && <p className="text-xs">{item.note}</p>}
            {item.images && (
                <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                    {item.images.map((image) => (
                        <div key={image.src} className="relative aspect-[16/10] border border-line">
                            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 600px" className="object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Dial({ sel }: { sel: Item }) {
    const ranAlongside = (i: Item) => startOf(i) < endOf(sel) && startOf(sel) < endOf(i);

    return (
        <svg viewBox="0 8 320 286" role="img" aria-label={`Every project as a ring on a timeline, with ${sel.name} highlighted`} className="w-80 max-w-full">
            <path d={`M${polar(44, angleOf(YEAR_2026))}L${polar(OUTER_RING + 4, angleOf(YEAR_2026))}`} stroke="var(--color-faint)" />
            {items.map((i) => (
                <path
                    key={i.id}
                    d={arcOf(i)}
                    fill="none"
                    stroke={i === sel ? "var(--color-accent)" : ranAlongside(i) ? "var(--color-muted)" : "var(--color-line)"}
                    strokeWidth={i === sel ? 3 : 1.5}
                    strokeLinecap="square"
                />
            ))}
            {RING_LABELS.map((l) => (
                <text key={l.label} className="dial-text" x={152} y={l.y} textAnchor="end">{l.label}</text>
            ))}
            <text className="dial-text" x={yearX} y={yearY}>2026</text>
            <text className="dial-text" x={166} y={22}>Jun 2025</text>
            <text className="dial-text" x={28} y={150}>now</text>
        </svg>
    );
}

export function Plot() {
    const [picked, setPicked] = useState("factory");
    const [peek, setPeek] = useState<Lane | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const backButton = useRef<HTMLButtonElement>(null);
    const lastRow = useRef<HTMLElement>(null);
    const sel = items.find((i) => i.id === picked) ?? items[0];
    const open = laneIndex(peek ?? sel.lane);

    // On desktop the details are already beside the plot, so the phone sheet stays hidden.
    const pick = (id: string, row: HTMLElement) => {
        setPicked(id);
        setPeek(null);
        setSheetOpen(true);
        lastRow.current = row;
        requestAnimationFrame(() => backButton.current?.focus());
    };
    const closeSheet = () => {
        setSheetOpen(false);
        lastRow.current?.focus();
    };

    return (
        <section
            id="plot"
            className="mx-auto grid w-full max-w-[1240px] min-h-0 flex-1 gap-10 px-5 pt-12 pb-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-14 lg:pt-8 lg:pb-5"
        >
            <div className="flex min-h-0 flex-col gap-6">
                <div
                    className="board relative h-(--plot-height) w-full border-b border-white bg-[#111111] lg:h-auto lg:min-h-0 lg:flex-1"
                    style={{ "--plot-height": `${HEADER_HEIGHT + ROWS.length * ROW_HEIGHT}px` } as CSSProperties}
                    onMouseLeave={() => setPeek(null)}
                >
                    <span className="absolute inset-x-0 h-px bg-white" style={{ top: HEADER_HEIGHT }} />
                    {ROWS.map((i) => (
                        <span
                            key={i.id}
                            className="absolute left-1.5 -translate-y-1/2 text-[10px]"
                            style={{ top: rowY(i, 0.5) }}
                        >
                            {startLabel(i)}
                        </span>
                    ))}
                    {LANES.map(([lane, label], index) => {
                        const isOpen = index === open;
                        return (
                            <div
                                key={lane}
                                className="lane absolute inset-y-0"
                                style={{ left: laneLeft(index, open), width: laneWidth(index, open) }}
                                onMouseEnter={() => setPeek(lane)}
                                onFocus={() => setPeek(lane)}
                            >
                                <span className="absolute bottom-0 w-px bg-faint" style={{ left: POINT_X, top: HEADER_HEIGHT }} />
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setPeek(lane)}
                                    className={`absolute top-0 flex cursor-pointer items-center gap-1.5 text-[10px] whitespace-nowrap hover:text-white ${index > open ? "right-0" : "left-0"} ${isOpen ? "text-white" : ""}`}
                                    style={{ height: HEADER_HEIGHT }}
                                >
                                    {label} <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                                </button>
                                {ROWS.filter((i) => i.lane === lane).map((i) => {
                                    const selected = i === sel;
                                    return (
                                        <button
                                            key={i.id}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={(e) => pick(i.id, e.currentTarget)}
                                            className="group absolute inset-x-0 cursor-pointer"
                                            style={{ top: rowY(i), height: rowHeight }}
                                        >
                                            <span
                                                className={`absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 border border-white group-hover:bg-white ${selected ? "size-3.5 bg-white" : "size-2.5 bg-black"}`}
                                                style={{ left: POINT_X }}
                                            />
                                            <span className={`frame absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${selected ? "frame-on" : ""}`} style={{ left: POINT_X }} />
                                            <span className="absolute inset-y-0 right-0 flex min-w-0 items-center" style={{ left: POINT_X + 14 }}>
                                                <span className={`truncate pr-1 text-xs transition-opacity duration-150 group-hover:text-white ${isOpen ? "" : "opacity-0"} ${selected ? "text-white" : "text-muted"}`}>
                                                    {i.name}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="flex shrink-0 justify-center">
                    <Dial sel={sel} />
                </div>
            </div>

            <div key={sel.id} aria-live="polite" className="swap hidden min-h-0 overflow-y-auto lg:block">
                <Details item={sel} />
            </div>

            <div
                role="dialog"
                aria-modal="true"
                aria-label={sel.name}
                inert={!sheetOpen}
                onKeyDown={(e) => e.key === "Escape" && closeSheet()}
                className={`sheet fixed inset-0 z-20 overflow-y-auto overscroll-contain bg-black px-5 pb-10 lg:hidden ${sheetOpen ? "" : "translate-x-full"}`}
            >
                <button ref={backButton} type="button" onClick={closeSheet} className="inline-flex min-h-11 cursor-pointer items-center text-xs text-white">← Back</button>
                <div key={sel.id} className="swap mt-2">
                    <Details item={sel} />
                </div>
            </div>
        </section>
    );
}
