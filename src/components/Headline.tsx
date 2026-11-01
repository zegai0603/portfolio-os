"use client";

import type { CSSProperties, PointerEvent } from "react";

const GLYPHS = "+=#%/<>01";
const FRAMES = 8;
const FRAME_MS = 45;
const SPREAD = 2;
const RIPPLE_MS = 40;

// Glyphs sit over the real letter through a data attribute, so the headline never reflows or re-renders.
function decode(letter: Element | undefined) {
    if (!(letter instanceof HTMLElement) || letter.dataset.glyph || !letter.textContent?.trim()) return;
    let frames = FRAMES;
    const tick = () => {
        if (frames-- === 0) {
            delete letter.dataset.glyph;
            return;
        }
        letter.dataset.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        setTimeout(tick, FRAME_MS);
    };
    tick();
}

function decodeAround(e: PointerEvent<HTMLHeadingElement>) {
    const letters = [...e.currentTarget.children];
    const index = letters.indexOf(e.target as Element);
    if (index < 0 || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let offset = -SPREAD; offset <= SPREAD; offset++) {
        setTimeout(() => decode(letters[index + offset]), Math.abs(offset) * RIPPLE_MS);
    }
}

export function Headline({ text }: { text: string }) {
    return (
        <h1
            aria-label={text}
            onPointerOver={decodeAround}
            className="font-display cursor-default text-[clamp(52px,10vw,128px)] leading-none font-extralight tracking-[-0.05em] text-balance text-white"
        >
            {[...text].map((char, i) => (
                <span key={i} aria-hidden="true" className="type-char" style={{ "--i": i } as CSSProperties}>
                    {char}
                </span>
            ))}
        </h1>
    );
}
