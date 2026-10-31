"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
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

// The plot runs down the page, newest first: each item has its own row, and its column is its lane.
// A lane appears with its first item.
const LANES = (
    [
        ["work", "WORK"],
        ["projects", "PROJECTS"],
        ["blogs", "BLOGS"],
    ] as [Lane, string][]
).filter(([lane]) => items.some((i) => i.lane === lane));
const ROWS = [...items].sort((a, b) => startOf(b) - startOf(a));
const HEADER_HEIGHT = 28;
const ROW_HEIGHT = 44;
const FIRST_LANE_X = 60;
const LANE_GAP = 44;
const laneX = (lane: Lane) => FIRST_LANE_X + LANES.findIndex(([id]) => id === lane) * LANE_GAP;

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
        <svg viewBox="0 0 320 320" role="img" aria-label={`Every project as a ring on a timeline, with ${sel.name} highlighted`} className="w-80 max-w-full">
            <path d={`M${polar(44, angleOf(YEAR_2026))}L${polar(OUTER_RING + 4, angleOf(YEAR_2026))}`} stroke="var(--color-faint)" />
            <circle className="dial-cross" cx={CENTRE} cy={CENTRE} r={ringOf(sel)} style={{ r: `${ringOf(sel)}px` } as CSSProperties} />
            <line className="dial-cross hand" x1={CENTRE} y1={116} x2={CENTRE} y2={2} style={{ transform: `rotate(${angleOf(startOf(sel))}deg)` }} />
            {items.map((i) => (
                <path
                    key={i.id}
                    d={arcOf(i)}
                    fill="none"
                    stroke={i === sel ? "#ffffff" : ranAlongside(i) ? "var(--color-muted)" : "var(--color-line)"}
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
    const sel = items.find((i) => i.id === picked) ?? items[0];
    const selRow = ROWS.indexOf(sel);

    // On phones the details open under the row, so the tapped row can move: keep it on screen.
    const pick = (id: string, row: HTMLElement) => {
        setPicked(id);
        requestAnimationFrame(() => row.scrollIntoView({ block: "nearest" }));
    };

    return (
        <section id="plot" className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 pt-12 pb-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-14">
            <div className="flex flex-col items-center gap-10">
                <div className="relative w-full border-y border-line">
                    <div className="relative" style={{ height: HEADER_HEIGHT }}>
                        {LANES.map(([lane, label]) => (
                            <span key={lane} className="absolute top-1.5 -translate-x-1/2 text-[10px]" style={{ left: laneX(lane) }}>{label}</span>
                        ))}
                    </div>
                    {LANES.map(([lane]) => (
                        <span key={lane} className="absolute bottom-0 w-px bg-faint" style={{ left: laneX(lane), top: HEADER_HEIGHT }} />
                    ))}
                    <span className="xh bottom-0" style={{ left: laneX(sel.lane), top: HEADER_HEIGHT, borderLeftWidth: 1 }} />
                    <span className="xh inset-x-0" style={{ top: HEADER_HEIGHT + selRow * ROW_HEIGHT + ROW_HEIGHT / 2, borderTopWidth: 1 }} />
                    {ROWS.map((i) => {
                        const selected = i === sel;
                        const x = laneX(i.lane);
                        return (
                            <div key={i.id}>
                                <button
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={(e) => pick(i.id, e.currentTarget)}
                                    className="group relative block w-full cursor-pointer"
                                    style={{ height: ROW_HEIGHT }}
                                >
                                    <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px]">{startLabel(i)}</span>
                                    <span
                                        className={`absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 border border-white group-hover:bg-white ${selected ? "size-3.5 bg-white" : "size-2.5 bg-black"}`}
                                        style={{ left: x }}
                                    />
                                    <span className="absolute inset-y-0 right-0 flex min-w-0 items-center" style={{ left: x + 12 }}>
                                        <span className={`truncate bg-black px-1 text-xs group-hover:text-white ${selected ? "text-white" : "text-muted"}`}>{i.name}</span>
                                    </span>
                                </button>
                                {selected && (
                                    <div className="relative bg-black py-5 lg:hidden">
                                        <Details item={i} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="lg:hidden">
                    <Dial sel={sel} />
                </div>
            </div>

            <div aria-live="polite" className="sticky top-8 hidden flex-col gap-8 lg:flex">
                <Details item={sel} />
                <Dial sel={sel} />
            </div>
        </section>
    );
}
