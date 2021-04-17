import { forwardRef, useMemo } from 'react';
import './style.scss';

interface Source {
  src: string;
  mimeType: string;
}

type FitMode = 'cover' | 'contain';

interface Props {
  sources?: Source[];
  onEnded?: () => any;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  objectFit?: FitMode;
  loop?: boolean;
  oneHundredPercentHeight?: boolean;
}

const FullSizeVideo = forwardRef<HTMLVideoElement, Props>((props, ref) => {
  const {
    sources = [],
    onEnded,
    autoPlay = true,
    muted = true,
    controls = false,
    objectFit = 'cover',
    loop = false,
    oneHundredPercentHeight = true,
  } = props;

  const sourceElements = useMemo(
    () =>
      sources.map((source, index) => (
        <source
          key={`source-${index}`}
          src={source.src}
          type={source.mimeType}
        />
      )),
    [sources]
  );

  const { clientHeight: rootElementHeight } =
    document.getElementById('root') ?? {};

  const style = useMemo(
    () => ({
      objectFit,
      maxHeight: rootElementHeight,
      ...(oneHundredPercentHeight && { height: '100%' }),
    }),
    [objectFit, oneHundredPercentHeight, rootElementHeight]
  );

  if (sourceElements.length === 0) {
    return null;
  }

  return (
    <video
      className='full-size-video'
      autoPlay={autoPlay}
      muted={autoPlay || muted}
      onEnded={onEnded}
      controls={controls}
      disablePictureInPicture
      controlsList='nodownload nofullscreen'
      style={style}
      playsInline
      ref={ref}
      loop={loop}
    >
      {sourceElements}
      Browser is not suppoted.
    </video>
  );
});

export default FullSizeVideo;
