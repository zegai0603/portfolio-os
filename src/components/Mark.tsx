// The logo: the timeline dial reduced to one ring, with the crosshair on a point of it, as on the plot.
export function Mark({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path d="M21 11V32M21 11V0M0 11H32" stroke="#ff5a1f" strokeWidth="1.75" />
            <path d="M21 11A10 10 0 1 1 7 11" stroke="#ffffff" strokeWidth="2.25" />
            <rect x="18.5" y="8.5" width="5" height="5" fill="#ffffff" />
        </svg>
    );
}
