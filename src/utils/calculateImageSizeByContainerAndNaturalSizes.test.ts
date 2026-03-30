import calculateImageSizeByContainerAndNaturalSizes from './calculateImageSizeByContainerAndNaturalSizes';

describe('calculateImageSizeByContainerAndNaturalSizes', () => {
  it('returns full container size when image and container aspect ratios match', () => {
    expect(calculateImageSizeByContainerAndNaturalSizes(400, 200, 1200, 600)).toEqual({
      width: 400,
      height: 200,
    });
  });

  it('limits width by container and scales height for wider images', () => {
    expect(calculateImageSizeByContainerAndNaturalSizes(300, 300, 1200, 600)).toEqual({
      width: 300,
      height: 150,
    });
  });

  it('limits height by container and scales width for taller images', () => {
    expect(calculateImageSizeByContainerAndNaturalSizes(300, 300, 600, 1200)).toEqual({
      width: 150,
      height: 300,
    });
  });

  it('never exceeds container bounds for arbitrary dimensions', () => {
    const result = calculateImageSizeByContainerAndNaturalSizes(320, 180, 2000, 500);

    expect(result.width).toBeLessThanOrEqual(320);
    expect(result.height).toBeLessThanOrEqual(180);
    expect(result.width / result.height).toBeCloseTo(4, 5);
  });

  it('returns zero size when container dimensions are non-positive', () => {
    expect(calculateImageSizeByContainerAndNaturalSizes(0, 180, 2000, 500)).toEqual({
      width: 0,
      height: 0,
    });
    expect(calculateImageSizeByContainerAndNaturalSizes(320, -1, 2000, 500)).toEqual({
      width: 0,
      height: 0,
    });
  });

  it('returns zero size when natural image dimensions are non-positive', () => {
    expect(calculateImageSizeByContainerAndNaturalSizes(320, 180, 0, 500)).toEqual({
      width: 0,
      height: 0,
    });
    expect(calculateImageSizeByContainerAndNaturalSizes(320, 180, 2000, -1)).toEqual({
      width: 0,
      height: 0,
    });
  });
});
