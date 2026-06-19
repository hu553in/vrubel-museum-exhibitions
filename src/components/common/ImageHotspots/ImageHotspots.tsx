import type { CSSProperties } from 'react';
import { useCallback, useState } from 'react';

import type { Props as ImageHotspotProps } from '@/components/common/ImageHotspot/ImageHotspot';
import ImageHotspot from '@/components/common/ImageHotspot/ImageHotspot';
import useFittedImageSize from '@/hooks/useFittedImageSize';
import { getImageHotspotKey } from '@/utils/imageHotspot';

import styles from './style.module.css';

interface Props {
  parentElement: HTMLElement | null;
  src: string;
  alt: string;
  imageHotspots: ImageHotspotProps[];
}

function ImageHotspots(props: Props) {
  const { parentElement, src, alt, imageHotspots } = props;

  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
  const syncImageNaturalSize = useCallback((imageElement: HTMLImageElement | null) => {
    const nextSize = {
      width: imageElement?.naturalWidth ?? 0,
      height: imageElement?.naturalHeight ?? 0,
    };

    setImageNaturalSize(previousSize => {
      if (previousSize.width === nextSize.width && previousSize.height === nextSize.height) {
        return previousSize;
      }

      return nextSize;
    });
  }, []);

  const rootAndImageStyle: CSSProperties = useFittedImageSize(
    parentElement,
    imageNaturalSize.width,
    imageNaturalSize.height
  );

  return (
    <div className={styles['imageHotspots']} style={rootAndImageStyle}>
      <img
        key={src}
        ref={syncImageNaturalSize}
        src={src}
        alt={alt}
        style={rootAndImageStyle}
        onLoad={event => {
          syncImageNaturalSize(event.currentTarget);
        }}
        onError={event => {
          syncImageNaturalSize(event.currentTarget);
        }}
      />
      {imageHotspots.map((hotspot, index) => (
        <ImageHotspot key={getImageHotspotKey(hotspot.x, hotspot.y, index)} {...hotspot} />
      ))}
    </div>
  );
}

export default ImageHotspots;
