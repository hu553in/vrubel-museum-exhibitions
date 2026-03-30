interface PictureSizeStyle {
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
}

type GalosPictureStyle = PictureSizeStyle & Record<string, unknown>;

const getGalosPictureStyle = (
  pictureSize: number | undefined,
  animationStyle: Record<string, unknown>
): GalosPictureStyle | Record<string, never> => {
  if (pictureSize === undefined) {
    return {};
  }

  return {
    ...animationStyle,
    minWidth: pictureSize,
    minHeight: pictureSize,
    maxWidth: pictureSize,
    maxHeight: pictureSize,
  };
};

export default getGalosPictureStyle;
