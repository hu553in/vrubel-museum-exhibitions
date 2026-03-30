import getGalosLayout from './galosLayout';

describe('getGalosLayout', () => {
  it('returns an empty layout when dimensions are missing', () => {
    expect(getGalosLayout(undefined, undefined)).toEqual({});
    expect(getGalosLayout(undefined, 200)).toEqual({});
  });

  it('returns only header width when height is missing but width is present', () => {
    expect(getGalosLayout(300, undefined)).toEqual({ headerWidth: 300 });
  });

  it('returns only header width when dimensions are non-positive', () => {
    expect(getGalosLayout(300, 0)).toEqual({ headerWidth: 300 });
    expect(getGalosLayout(300, -1)).toEqual({ headerWidth: 300 });
  });

  it('calculates square layout values', () => {
    expect(getGalosLayout(400, 400)).toEqual({
      headerWidth: 400,
      main: {
        width: 400,
        minHeight: 400,
      },
      pictureSize: 400,
      circle: {
        minWidth: 160,
        minHeight: 160,
        maxWidth: 160,
        maxHeight: 160,
        top: 200,
        left: 200,
      },
      infoBlock: {
        maxWidth: 140,
        top: 200,
        left: 220.00000000000003,
        gap: 20,
      },
    });
  });

  it('uses the smaller dimension for picture and spacing calculations in landscape mode', () => {
    expect(getGalosLayout(500, 300)).toEqual({
      headerWidth: 500,
      main: {
        width: 500,
        minHeight: 300,
      },
      pictureSize: 300,
      circle: {
        minWidth: 120,
        minHeight: 120,
        maxWidth: 120,
        maxHeight: 120,
        top: 150,
        left: 250,
      },
      infoBlock: {
        maxWidth: 175,
        top: 150,
        left: 275,
        gap: 15,
      },
    });
  });

  it('uses the smaller dimension for picture and spacing calculations in portrait mode', () => {
    expect(getGalosLayout(300, 500)).toEqual({
      headerWidth: 300,
      main: {
        width: 300,
        minHeight: 500,
      },
      pictureSize: 300,
      circle: {
        minWidth: 120,
        minHeight: 120,
        maxWidth: 120,
        maxHeight: 120,
        top: 250,
        left: 150,
      },
      infoBlock: {
        maxWidth: 105,
        top: 250,
        left: 165,
        gap: 15,
      },
    });
  });
});
