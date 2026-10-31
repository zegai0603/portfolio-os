// The logo: a Z drawn as a failed backtest. The top stroke is the backtest, the grey line is
// where testing starts, and the orange diagonal is the crash after it.
export function Mark({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path d="M22 3V29" stroke="#8c8c8c" strokeWidth="1" />
            <path d="M5 8H22" stroke="#ffffff" strokeWidth="3" />
            <path d="M8 24H27" stroke="#ffffff" strokeWidth="3" />
            <path d="M18 6.5H22L12 25.5H8Z" fill="#ff5a1f" />
        </svg>
    );
}
