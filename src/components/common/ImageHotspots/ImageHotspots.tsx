import ImageHotspot, {
  Props as ImageHotspotProps,
} from '@/components/common/ImageHotspot/ImageHotspot';
import calculateImageSizeByContainerAndNaturalSizes from '@/utils/calculateImageSizeByContainerAndNaturalSizes';
import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import './style.scss';

interface Props {
  parentElement: HTMLElement | null;
  src: string;
  alt: string;
  imageHotspots: ImageHotspotProps[];
}

const ImageHotspots: React.FC<Props> = props => {
  const { parentElement, src, alt, imageHotspots } = props;
  useWindowSize();

  const [imageStateRef, setImageStateRef] = useState<HTMLImageElement | null>(null);
  const [, setImageLoaded] = useState(false);

  const imageCallbackRef = useCallback(
    (node: HTMLImageElement | null) => setImageStateRef(node),
    []
  );

  const { clientWidth: parentClientWidth, clientHeight: parentClientHeight } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const { naturalWidth: imageNaturalWidth, naturalHeight: imageNaturalHeight } = imageStateRef ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const rootAndImageStyle = useMemo(
    () =>
      (!parentClientWidth || !parentClientHeight || !imageNaturalWidth || !imageNaturalHeight
        ? { width: 0, height: 0 }
        : calculateImageSizeByContainerAndNaturalSizes(
            parentClientWidth,
            parentClientHeight,
            imageNaturalWidth,
            imageNaturalHeight
          )) as CSSProperties,
    [imageNaturalHeight, imageNaturalWidth, parentClientHeight, parentClientWidth]
  );

  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  return (
    <div className='image-hotspots' style={rootAndImageStyle}>
      <img
        ref={imageCallbackRef}
        src={src}
        alt={alt}
        style={rootAndImageStyle}
        onLoad={() => setImageLoaded(true)}
      />
      {imageHotspots.map((hotspot, index) => (
        <ImageHotspot key={`image-hotspot-${index}`} {...hotspot} />
      ))}
    </div>
  );
};

export default ImageHotspots;
