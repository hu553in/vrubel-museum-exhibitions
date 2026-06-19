import type { CSSProperties } from 'react';

const createImageHotspotStyle = (x: number, y: number): CSSProperties => ({
  top: `${String(y)}%`,
  left: `${String(x)}%`,
});

const getImageHotspotKey = (x: number, y: number, index: number) =>
  `${String(x)}-${String(y)}-${String(index)}`;

export { createImageHotspotStyle, getImageHotspotKey };
