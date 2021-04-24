import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
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

  const [loading, setLoading] = useState(false);
  const handleCanPlayThrough = useCallback(() => setLoading(false), []);

  useEffect(() => {
    setLoading(true);
  }, []);

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
    <>
      {loading && <div className='full-size-video__full-screen-loading' />}
      <video
        className='full-size-video'
        autoPlay={autoPlay}
        muted={autoPlay || muted}
        onEnded={onEnded}
        controls={controls}
        disablePictureInPicture
        controlsList='nodownload nofullscreen'
        preload='metadata'
        onCanPlayThrough={handleCanPlayThrough}
        style={style}
        playsInline
        ref={ref}
        loop={loop}
      >
        {sourceElements}
        Невозможно воспроизвести видео :(
      </video>
    </>
  );
});

export default FullSizeVideo;
