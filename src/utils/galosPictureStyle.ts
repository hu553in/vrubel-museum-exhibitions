import { animated } from '@react-spring/web';
import type { ComponentProps } from 'react';

interface PictureSizeStyle {
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
}

type GalosPictureStyle = ComponentProps<typeof animated.img>['style'] & Partial<PictureSizeStyle>;

const getGalosPictureStyle = (
  pictureSize: number | undefined,
  animationStyle: ComponentProps<typeof animated.img>['style']
): GalosPictureStyle => {
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
