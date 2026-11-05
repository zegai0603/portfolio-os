"use client";

import { useEffect, useState, type ComponentProps } from "react";

// A post image that fills the screen on click, like Notion; Esc or another click closes it.
// It restyles itself rather than opening a <dialog>, because Markdown puts images inside a <p>.
export function ZoomImage({ src, alt }: ComponentProps<"img">) {
    const [zoomed, setZoomed] = useState(false);
    useEffect(() => {
        if (!zoomed) return;
        const close = (event: KeyboardEvent) => event.key === "Escape" && setZoomed(false);
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [zoomed]);
    return (
        // eslint-disable-next-line @next/next/no-img-element -- Markdown images are plain files of any size
        <img
            src={src}
            alt={alt}
            onClick={() => setZoomed(!zoomed)}
            className={zoomed ? "fixed inset-0 z-50 m-0! h-full w-full cursor-zoom-out bg-black/90 object-contain p-4" : "cursor-zoom-in"}
        />
    );
}
