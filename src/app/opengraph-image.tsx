import { ImageResponse } from 'next/og';
import { Mark } from '@/components/Mark';

export const alt = 'Zhe Khai Tew';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// The link preview: the name beside the logo
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 96, background: '#000000', color: '#ffffff' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 88, letterSpacing: -3 }}>Zhe Khai Tew</div>
                    <div style={{ marginTop: 16, fontSize: 32, color: '#8c8c8c' }}>Computer Science at SMU</div>
                </div>
                <Mark size={360} />
            </div>
        ),
        {
            ...size,
        }
    );
}
