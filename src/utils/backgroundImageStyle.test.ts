import { describe, expect, it } from 'vitest';

import { createBackgroundImageStyle } from './backgroundImageStyle';

describe('createBackgroundImageStyle', () => {
  it('creates a background image style object', () => {
    expect(createBackgroundImageStyle('/assets/icon.svg')).toEqual({
      backgroundImage: 'url("/assets/icon.svg")',
    });
  });

  it('supports empty paths without throwing', () => {
    expect(createBackgroundImageStyle('')).toEqual({
      backgroundImage: 'url("")',
    });
  });

  it('preserves special characters in the URL', () => {
    expect(createBackgroundImageStyle('/assets/my image(1).webp?size=2x')).toEqual({
      backgroundImage: 'url("/assets/my image(1).webp?size=2x")',
    });
  });
});
