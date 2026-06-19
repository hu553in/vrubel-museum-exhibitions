import {
  createPictureHotspotViewModels,
  createVideoSources,
  getActiveAnimatedVariation,
  getPictureCapabilities,
} from './pictureScene';

describe('pictureScene', () => {
  describe('createVideoSources', () => {
    it('returns an empty array for missing source set', () => {
      expect(createVideoSources()).toEqual([]);
    });

    it('returns mp4 and webm sources in deterministic order', () => {
      expect(createVideoSources({ mp4: 'video.mp4', webm: 'video.webm' })).toEqual([
        {
          src: 'video.mp4',
          mimeType: 'video/mp4',
          mimeTypeUserReadable: 'MP4',
        },
        {
          src: 'video.webm',
          mimeType: 'video/webm',
          mimeTypeUserReadable: 'WebM',
        },
      ]);
    });

    it('skips missing formats', () => {
      expect(createVideoSources({ webm: 'video.webm' })).toEqual([
        {
          src: 'video.webm',
          mimeType: 'video/webm',
          mimeTypeUserReadable: 'WebM',
        },
      ]);
    });
  });

  describe('getActiveAnimatedVariation', () => {
    const animatedVariations = [
      { name: 'first', mp4: 'first.mp4' },
      { name: 'second', mp4: 'second.mp4' },
    ];

    it('returns undefined when animated variations are absent', () => {
      expect(getActiveAnimatedVariation(undefined, 0)).toBeUndefined();
      expect(getActiveAnimatedVariation([], 0)).toBeUndefined();
    });

    it('returns the requested animated variation', () => {
      expect(getActiveAnimatedVariation(animatedVariations, 1)).toEqual(animatedVariations[1]);
    });

    it('clamps negative and too-large indexes', () => {
      expect(getActiveAnimatedVariation(animatedVariations, -1)).toEqual(animatedVariations[0]);
      expect(getActiveAnimatedVariation(animatedVariations, 99)).toEqual(animatedVariations[1]);
    });
  });

  describe('createPictureHotspotViewModels', () => {
    it('returns an empty array when hotspots are absent', () => {
      expect(createPictureHotspotViewModels(undefined)).toEqual([]);
    });

    it('maps hotspot percentages into percents and video sources', () => {
      expect(
        createPictureHotspotViewModels([
          {
            name: 'Небо',
            positionPercentage: { x: 0.25, y: 0.5 },
            mp4: 'sky.mp4',
            webm: 'sky.webm',
          },
        ])
      ).toEqual([
        {
          name: 'Небо',
          x: 25,
          y: 50,
          videoSources: [
            {
              src: 'sky.mp4',
              mimeType: 'video/mp4',
              mimeTypeUserReadable: 'MP4',
            },
            {
              src: 'sky.webm',
              mimeType: 'video/webm',
              mimeTypeUserReadable: 'WebM',
            },
          ],
        },
      ]);
    });
  });

  describe('getPictureCapabilities', () => {
    it('returns fully disabled capabilities for missing picture', () => {
      expect(getPictureCapabilities(undefined)).toEqual({
        animatedSources: [],
        hotspotViewModels: [],
        hasAnimatedVariations: false,
        hasAnimatedVideo: false,
        hasMagnifier: false,
        hasImageHotspots: false,
        hasDynamicButtons: false,
        hasPictureContent: false,
      });
    });

    it('enables picture content when at least one supported media mode is available', () => {
      const result = getPictureCapabilities({
        preview: 'preview.webp',
        name: 'Test',
        authorAndYear: 'Author',
        descriptionParagraphs: ['Paragraph'],
        animated: { mp4: 'animated.mp4' },
        sounds: [{ mp3: 'audio.mp3' }],
        magnifier: undefined,
        animatedVariations: undefined,
        imageHotspots: undefined,
      });

      expect(result.animatedSources).toHaveLength(1);
      expect(result.hasAnimatedVideo).toBe(true);
      expect(result.hasDynamicButtons).toBe(true);
      expect(result.hasPictureContent).toBe(true);
    });

    it('marks picture as unavailable when required textual fields are missing', () => {
      const result = getPictureCapabilities({
        preview: 'preview.webp',
        name: undefined,
        authorAndYear: undefined,
        descriptionParagraphs: undefined,
        animated: { mp4: 'animated.mp4' },
        sounds: undefined,
        magnifier: undefined,
        animatedVariations: undefined,
        imageHotspots: undefined,
      });

      expect(result.hasAnimatedVideo).toBe(true);
      expect(result.hasPictureContent).toBe(false);
    });

    it('recognizes magnifier, hotspots and animated variations independently', () => {
      const result = getPictureCapabilities({
        preview: 'preview.webp',
        name: 'Test',
        authorAndYear: 'Author',
        descriptionParagraphs: ['Paragraph'],
        animated: undefined,
        sounds: undefined,
        magnifier: 'magnifier.gif',
        animatedVariations: [{ name: 'front', mp4: 'front.mp4' }],
        imageHotspots: [
          {
            name: 'Hotspot',
            positionPercentage: { x: 0.1, y: 0.2 },
            mp4: 'hotspot.mp4',
          },
        ],
      });

      expect(result.hasMagnifier).toBe(true);
      expect(result.hasAnimatedVariations).toBe(true);
      expect(result.hasImageHotspots).toBe(true);
      expect(result.hotspotViewModels).toHaveLength(1);
      expect(result.hasDynamicButtons).toBe(true);
      expect(result.hasPictureContent).toBe(true);
    });
  });
});
