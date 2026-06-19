import type { CSSProperties } from 'react';

export const createBackgroundImageStyle = (imageUrl: string): CSSProperties => ({
  backgroundImage: `url("${imageUrl}")`,
});
