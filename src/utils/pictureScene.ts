interface SourceSet {
  mp4?: string;
  webm?: string;
}

interface SoundItem {
  mp3: string;
}

interface PictureImageHotspotSource extends SourceSet {
  name: string;
  positionPercentage: {
    x: number;
    y: number;
  };
}

interface PictureSceneInput {
  preview: string | undefined;
  name: string | undefined;
  authorAndYear: string | undefined;
  descriptionParagraphs: string[] | undefined;
  animated: SourceSet | undefined;
  sounds: SoundItem[] | undefined;
  magnifier: string | undefined;
  animatedVariations: (SourceSet & { name: string })[] | undefined;
  imageHotspots: PictureImageHotspotSource[] | undefined;
}

export interface VideoSource {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
}

export interface PictureHotspotViewModel {
  name: string;
  x: number;
  y: number;
  videoSources: VideoSource[];
}

export const createVideoSources = (sourceSet?: SourceSet): VideoSource[] => {
  const result: VideoSource[] = [];

  if (sourceSet?.mp4) {
    result.push({
      src: sourceSet.mp4,
      mimeType: 'video/mp4',
      mimeTypeUserReadable: 'MP4',
    });
  }

  if (sourceSet?.webm) {
    result.push({
      src: sourceSet.webm,
      mimeType: 'video/webm',
      mimeTypeUserReadable: 'WebM',
    });
  }

  return result;
};

export const getActiveAnimatedVariation = (
  animatedVariations: (SourceSet & { name: string })[] | undefined,
  requestedIndex: number
) => {
  if (!animatedVariations?.length) {
    return undefined;
  }

  return animatedVariations[Math.min(Math.max(requestedIndex, 0), animatedVariations.length - 1)];
};

export const createPictureHotspotViewModels = (
  imageHotspots: PictureImageHotspotSource[] | undefined
): PictureHotspotViewModel[] =>
  (imageHotspots ?? []).map(imageHotspot => ({
    name: imageHotspot.name,
    x: imageHotspot.positionPercentage.x * 100,
    y: imageHotspot.positionPercentage.y * 100,
    videoSources: createVideoSources(imageHotspot),
  }));

export const getPictureCapabilities = (picture: PictureSceneInput | undefined) => {
  if (!picture) {
    return {
      animatedSources: [],
      hotspotViewModels: [],
      hasAnimatedVariations: false,
      hasAnimatedVideo: false,
      hasMagnifier: false,
      hasImageHotspots: false,
      hasDynamicButtons: false,
      hasPictureContent: false,
    };
  }

  const animatedSources = createVideoSources(picture.animated);
  const hotspotViewModels = createPictureHotspotViewModels(picture.imageHotspots);

  const hasAnimatedVariations = Boolean(picture.animatedVariations?.length);
  const hasAnimatedVideo = animatedSources.length > 0;
  const hasMagnifier = Boolean(picture.name && picture.magnifier);
  const hasImageHotspots = Boolean(picture.preview && picture.name && hotspotViewModels.length);
  const hasDynamicButtons = Boolean(
    (picture.animatedVariations?.length ?? 0) || (picture.sounds?.length ?? 0)
  );
  const hasPictureContent = Boolean(
    picture.preview &&
    picture.name &&
    picture.authorAndYear &&
    picture.descriptionParagraphs &&
    (hasAnimatedVideo || hasMagnifier || hasImageHotspots || hasAnimatedVariations)
  );

  return {
    animatedSources,
    hotspotViewModels,
    hasAnimatedVariations,
    hasAnimatedVideo,
    hasMagnifier,
    hasImageHotspots,
    hasDynamicButtons,
    hasPictureContent,
  };
};
