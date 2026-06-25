import type { CSSProperties } from 'react';
import { useWindowSize } from 'usehooks-ts';

import calculateImageSizeByContainerAndNaturalSizes from '@/utils/calculateImageSizeByContainerAndNaturalSizes';

type Size = CSSProperties & {
  width: number;
  height: number;
};

interface ParentSize {
  clientWidth: number;
  clientHeight: number;
}

const EMPTY_SIZE: Size = { width: 0, height: 0 };
const EMPTY_PARENT_SIZE: ParentSize = { clientWidth: 0, clientHeight: 0 };

function useFittedImageSize(
  parentElement: HTMLElement | null,
  naturalWidth: number,
  naturalHeight: number
): Size {
  useWindowSize();

  const { clientWidth: parentWidth, clientHeight: parentHeight } =
    parentElement ?? EMPTY_PARENT_SIZE;

  if (!parentWidth || !parentHeight || !naturalWidth || !naturalHeight) {
    return EMPTY_SIZE;
  }

  const { width, height } = calculateImageSizeByContainerAndNaturalSizes(
    parentWidth,
    parentHeight,
    naturalWidth,
    naturalHeight
  );

  return { width, height };
}

export default useFittedImageSize;
