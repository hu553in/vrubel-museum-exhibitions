import './style.scss';

import type { CSSProperties } from 'react';
import { useState } from 'react';

import type { Props as ImageHotspotProps } from '@/components/common/ImageHotspot/ImageHotspot';
import ImageHotspot from '@/components/common/ImageHotspot/ImageHotspot';
import useFittedImageSize from '@/hooks/useFittedImageSize';

interface Props {
  parentElement: HTMLElement | null;
  src: string;
  alt: string;
  imageHotspots: ImageHotspotProps[];
}

function ImageHotspots(props: Props) {
  const { parentElement, src, alt, imageHotspots } = props;

  const [imageStateRef, setImageStateRef] = useState<HTMLImageElement | null>(null);
  const { naturalWidth: imageNaturalWidth, naturalHeight: imageNaturalHeight } = imageStateRef ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const rootAndImageStyle: CSSProperties = useFittedImageSize(
    parentElement,
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
