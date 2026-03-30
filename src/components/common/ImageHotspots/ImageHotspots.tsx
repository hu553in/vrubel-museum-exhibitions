import type { Props as ImageHotspotProps } from '@/components/common/ImageHotspot/ImageHotspot';
import ImageHotspot from '@/components/common/ImageHotspot/ImageHotspot';
import calculateImageSizeByContainerAndNaturalSizes from '@/utils/calculateImageSizeByContainerAndNaturalSizes';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import './style.scss';

interface Props {
  parentElement: HTMLElement | null;
  src: string;
  alt: string;
  imageHotspots: ImageHotspotProps[];
}

function ImageHotspots(props: Props) {
  const { parentElement, src, alt, imageHotspots } = props;
  useWindowSize();

  const [imageStateRef, setImageStateRef] = useState<HTMLImageElement | null>(null);

  const { clientWidth: parentClientWidth, clientHeight: parentClientHeight } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const { naturalWidth: imageNaturalWidth, naturalHeight: imageNaturalHeight } = imageStateRef ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const rootAndImageStyle: CSSProperties =
    !parentClientWidth || !parentClientHeight || !imageNaturalWidth || !imageNaturalHeight
      ? { width: 0, height: 0 }
      : calculateImageSizeByContainerAndNaturalSizes(
          parentClientWidth,
          parentClientHeight,
          imageNaturalWidth,
          imageNaturalHeight
        );

  return (
    <div className='image-hotspots' style={rootAndImageStyle}>
      <img ref={setImageStateRef} src={src} alt={alt} style={rootAndImageStyle} />
      {imageHotspots.map((hotspot, index) => (
        <ImageHotspot
          key={`${String(hotspot.x)}-${String(hotspot.y)}-${String(index)}`}
          {...hotspot}
        />
      ))}
    </div>
  );
}

export default ImageHotspots;
