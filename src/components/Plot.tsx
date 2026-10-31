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

// The plot: x is the start month. Projects takes two rows because several start in the same month.
// The Blogs row appears with the first post.
const HAS_POSTS = items.some((i) => i.lane === "blogs");
const [WORK_Y, PROJECTS_Y, LOWER_Y] = HAS_POSTS ? [16, 40, 58] : [22, 48, 70];
const BLOGS_Y = 84;
const ROWS = [
    { label: "WORK", y: WORK_Y },
    { label: "PROJECTS", y: PROJECTS_Y },
    { label: "", y: LOWER_Y },
    ...(HAS_POSTS ? [{ label: "BLOGS", y: BLOGS_Y }] : []),
];
const LOWER_ROW = ["geo", "prize", "ctx", "factory"];
// Labels sit above their point unless a neighbour's label would hit them.
const LABEL_BELOW = ["fly", "ctx"];
const xOf = (m: number) => 3 + ((m - FROM) / (TO - FROM)) * 94;
const yOf = (i: Item) => (i.lane === "work" ? WORK_Y : i.lane === "blogs" ? BLOGS_Y : LOWER_ROW.includes(i.id) ? LOWER_Y : PROJECTS_Y);

// The dial is the same plot as a circle: month sets the angle, and each project keeps its own ring.
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
const RING_LABELS = (
    [
        ["work", "WORK"],
        ["projects", "PROJECTS"],
        ["blogs", "BLOGS"],
    ] as [Lane, string][]
).filter(([lane]) => items.some((i) => i.lane === lane)).map(([lane, label]) => {
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

export function Plot() {
    const [picked, setPicked] = useState("factory");
    const sel = items.find((i) => i.id === picked) ?? items[0];
    const ranAlongside = (i: Item) => startOf(i) < endOf(sel) && startOf(sel) < endOf(i);

    return (
        <section id="plot" className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 pt-12 pb-10">
            <div className="overflow-x-auto">
                <div className="relative h-[500px] min-w-[1040px] border-y border-line">
                    {ROWS.map((row) => (
                        <div key={row.y}>
                            <span className="absolute right-0 text-[11px]" style={{ top: `calc(${row.y}% - 20px)` }}>{row.label}</span>
                            <span className="absolute inset-x-0 h-px bg-faint" style={{ top: `${row.y}%` }} />
                        </div>
                    ))}
                    <span className="absolute bottom-1 pl-1.5 text-[11px]" style={{ left: "3%" }}>2025</span>
                    <span className="absolute inset-y-0 w-px bg-faint" style={{ left: `${xOf(YEAR_2026)}%` }} />
                    <span className="absolute bottom-1 pl-1.5 text-[11px]" style={{ left: `${xOf(YEAR_2026)}%` }}>2026</span>
                    <span className="xh inset-y-0" style={{ left: `${xOf(startOf(sel))}%`, borderLeftWidth: 1 }} />
                    <span className="xh inset-x-0" style={{ top: `${yOf(sel)}%`, borderTopWidth: 1 }} />
                    {items.map((i) => {
                        const selected = i === sel;
                        return (
                            <button
                                key={i.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setPicked(i.id)}
                                className="group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                                style={{ left: `${xOf(startOf(i))}%`, top: `${yOf(i)}%` }}
                            >
                                <span className={`block border border-white group-hover:bg-white ${selected ? "size-3.5 bg-white" : "size-2.5 bg-black"}`} />
                                <span className={`absolute left-[30px] bg-black px-1 text-xs whitespace-nowrap group-hover:text-white ${LABEL_BELOW.includes(i.id) ? "top-8" : "-top-1.5"} ${selected ? "text-white" : "text-muted"}`}>
                                    {i.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <section aria-live="polite" className="flex min-h-[360px] flex-col gap-8">
                <div className="flex flex-wrap items-start gap-x-14 gap-y-6">
                    <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-2.5">
                        <h2 className="font-display text-[56px] leading-[1.06] font-extralight tracking-[-0.04em] text-white">{sel.name}</h2>
                        <p className="text-xs">{sel.when}</p>
                        <p className="mt-1.5 max-w-[62ch] text-[19px] text-white">{sel.what}</p>
                        {sel.bits.map((bit) => (
                            <p key={bit} className="text-[15px]">— {bit}</p>
                        ))}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {sel.links.map((link) => (
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
                        {sel.note && <p className="text-xs">{sel.note}</p>}
                    </div>

                    <svg viewBox="0 0 320 320" role="img" aria-label={`Every project as a ring on a timeline, with ${sel.name} highlighted`} className="w-80 max-w-full flex-none">
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
                </div>

                {sel.images && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                        {sel.images.map((image) => (
                            <div key={image.src} className="relative aspect-[16/10] border border-line">
                                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 600px" className="object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}
