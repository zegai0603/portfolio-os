// The logo: the site's dial cut down to three rings, with the project in focus in orange.
export function Mark({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path d="M29 16A13 13 0 1 1 16 3" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M24.46 19.08A9 9 0 1 1 10.97 8.54" stroke="#8c8c8c" strokeWidth="1.5" />
            <path d="M11.67 18.5A5 5 0 0 1 16.52 11.03" stroke="#ff5a1f" strokeWidth="2.5" />
        </svg>
    );
}
