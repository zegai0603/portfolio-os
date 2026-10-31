import { ImageResponse } from 'next/og';
import { Mark } from '@/components/Mark';

// Image metadata
export const size = {
    width: 48,
    height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', background: '#000000' }}>
                <Mark size={size.width} />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
