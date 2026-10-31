import { ImageResponse } from 'next/og';

export const alt = 'Zhe Khai Tew';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// The link preview: the name under the site's crosshair
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 96, position: 'relative', background: '#000000', color: '#ffffff' }}>
                <div style={{ position: 'absolute', left: 960, top: 0, width: 2, height: 630, background: '#ff5a1f' }} />
                <div style={{ position: 'absolute', left: 0, top: 200, width: 1200, height: 2, background: '#ff5a1f' }} />
                <div style={{ fontSize: 96, letterSpacing: -3 }}>Zhe Khai Tew</div>
                <div style={{ marginTop: 16, fontSize: 32, color: '#8c8c8c' }}>Computer Science at SMU</div>
            </div>
        ),
        {
            ...size,
        }
    );
}
