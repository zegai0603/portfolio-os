"use client";

import { useState } from "react";
import FaultyTerminal from "@/components/ui/FaultyTerminal";

const GRID_MUL: [number, number] = [2, 1];

export function Background() {
    const [still] = useState(() => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches);

    return (
        <div aria-hidden="true" className="absolute inset-0">
            <FaultyTerminal
                scale={1.7}
                gridMul={GRID_MUL}
                digitSize={1}
                timeScale={0.7}
                pause={still}
                scanlineIntensity={0}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0}
                dither={0}
                curvature={0}
                tint="#8c8c8c"
                mouseReact={!still}
                mouseStrength={0.2}
                pageLoadAnimation={!still}
                brightness={0.4}
                dpr={1}
            />
        </div>
    );
}
