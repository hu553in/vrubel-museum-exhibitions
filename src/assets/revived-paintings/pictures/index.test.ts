import pictures from './index';

const hasVideoSource = (item: { mp4?: string; webm?: string }) => Boolean(item.mp4 ?? item.webm);

describe('revived paintings dataset', () => {
  it('keeps unique picture ids', () => {
    const ids = pictures.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps required base fields filled for every picture', () => {
    expect(
      pictures.every(
        ({ id, name, authorAndYear, descriptionParagraphs, preview }) =>
          id.trim().length > 0 &&
          name.trim().length > 0 &&
          authorAndYear.trim().length > 0 &&
          descriptionParagraphs.length > 0 &&
          descriptionParagraphs.every(paragraph => paragraph.trim().length > 0) &&
          preview.length > 0
      )
    ).toBe(true);
  });

  it('keeps at least one supported display mode for every picture', () => {
    expect(
      pictures.every(
        ({ animated, magnifier, imageHotspots, animatedVariations }) =>
          hasVideoSource(animated ?? {}) ||
          Boolean(magnifier) ||
          Boolean(imageHotspots?.length) ||
          Boolean(animatedVariations?.length)
      )
    ).toBe(true);
  });

  it('keeps valid animated variations when they exist', () => {
    expect(
      pictures.every(({ animatedVariations }) => {
        if (!animatedVariations?.length) {
          return true;
        }

        const names = animatedVariations.map(({ name }) => name);

        return (
          new Set(names).size === names.length &&
          animatedVariations.every(
            variation =>
              variation.name.trim().length > 0 &&
              variation.icon.length > 0 &&
              hasVideoSource(variation)
          )
        );
      })
    ).toBe(true);
  });

  it('keeps hotspot coordinates in the normalized 0..1 range and provides hotspot media', () => {
    expect(
      pictures.every(({ imageHotspots }) =>
        (imageHotspots ?? []).every(
          hotspot =>
            hotspot.name.trim().length > 0 &&
            hotspot.positionPercentage.x >= 0 &&
            hotspot.positionPercentage.x <= 1 &&
            hotspot.positionPercentage.y >= 0 &&
            hotspot.positionPercentage.y <= 1 &&
            hasVideoSource(hotspot)
        )
      )
    ).toBe(true);
  });

  it('keeps valid sound entries when they exist', () => {
    expect(
      pictures.every(({ sounds }) => {
        if (!sounds?.length) {
          return true;
        }

        const soundNames = sounds.map(({ name }) => name);

        return (
          new Set(soundNames).size === soundNames.length &&
          sounds.every(
            sound => sound.name.trim().length > 0 && sound.icon.length > 0 && sound.mp3.length > 0
          )
        );
      })
    ).toBe(true);
  });
});
