import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useForceUpdate from '../../../hooks/useForceUpdate';
import useUpdateOnResize from '../../../hooks/useUpdateOnResize';
import calculateImageSizeByContainerAndNaturalSizes from '../../../utils/calculateImageSizeByContainerAndNaturalSizes';
import ImageHotspot, {
  Props as ImageHotspotProps,
} from '../ImageHotspot/ImageHotspot';
import './style.scss';

interface Props {
  parentElement: HTMLElement | null;
  src: string;
  alt: string;
  imageHotspots: ImageHotspotProps[];
}

const ImageHotspots: React.FC<Props> = props => {
  const { parentElement, src, alt, imageHotspots } = props;
  const forceUpdate = useForceUpdate();
  useUpdateOnResize();

  const [imageStateRef, setImageStateRef] = useState<HTMLImageElement | null>(
    null
  );

  const imageCallbackRef = useCallback(node => setImageStateRef(node), []);

  const {
    clientWidth: parentClientWidth,
    clientHeight: parentClientHeight,
  } = parentElement ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const {
    naturalWidth: imageNaturalWidth,
    naturalHeight: imageNaturalHeight,
  } = imageStateRef ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const rootAndImageStyle = useMemo(
    () =>
      (!parentClientWidth ||
      !parentClientHeight ||
      !imageNaturalWidth ||
      !imageNaturalHeight
        ? { width: 0, height: 0 }
        : calculateImageSizeByContainerAndNaturalSizes(
            parentClientWidth,
            parentClientHeight,
            imageNaturalWidth,
            imageNaturalHeight
          )) as CSSProperties,
    [
      parentClientHeight,
      parentClientWidth,
      imageNaturalHeight,
      imageNaturalWidth,
    ]
  );

  useEffect(() => {
    imageStateRef?.addEventListener('load', forceUpdate);
    return () => imageStateRef?.removeEventListener('load', forceUpdate);
  }, [forceUpdate, imageStateRef]);

  return (
    <div className='image-hotspots' style={rootAndImageStyle}>
      <img
        ref={imageCallbackRef}
        src={src}
        alt={alt}
        style={rootAndImageStyle}
      />
      {imageHotspots.map((hotspot, index) => (
        <ImageHotspot key={`image-hotspot-${index}`} {...hotspot} />
      ))}
    </div>
  );
};

export default ImageHotspots;
