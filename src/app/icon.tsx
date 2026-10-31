import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// The site's crosshair
export default function Icon() {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#000000' }}>
                <div style={{ position: 'absolute', left: 15, top: 0, width: 2, height: 32, background: '#ff5a1f' }} />
                <div style={{ position: 'absolute', left: 0, top: 15, width: 32, height: 2, background: '#ff5a1f' }} />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
