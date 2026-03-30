import { createImageHotspotStyle, getImageHotspotKey } from './imageHotspot';

describe('imageHotspot utils', () => {
  it('creates percentage-based styles for zero coordinates', () => {
    expect(createImageHotspotStyle(0, 0)).toEqual({
      top: '0%',
      left: '0%',
    });
  });

  it('creates percentage-based styles for full-edge coordinates', () => {
    expect(createImageHotspotStyle(100, 100)).toEqual({
      top: '100%',
      left: '100%',
    });
  });

  it('preserves fractional coordinates in the generated style', () => {
    expect(createImageHotspotStyle(12.5, 87.25)).toEqual({
      top: '87.25%',
      left: '12.5%',
    });
  });

  it('returns stable keys for the same coordinates and index', () => {
    expect(getImageHotspotKey(12.5, 87.25, 3)).toBe(getImageHotspotKey(12.5, 87.25, 3));
  });

  it('changes the key when index differs for otherwise identical hotspots', () => {
    expect(getImageHotspotKey(12.5, 87.25, 3)).not.toBe(getImageHotspotKey(12.5, 87.25, 4));
  });
});
