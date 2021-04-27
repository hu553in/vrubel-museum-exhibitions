import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import './style.scss';

interface Source {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
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

  const [loading, setLoading] = useState(true);
  const stopLoading = useCallback(() => setLoading(false), []);
  const [error, setError] = useState(false);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
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

  const sourceLinks = useMemo(
    () =>
      sources.map((source, index) => (
        <>
          <br key={`source-link-${index}-pre-new-line`} />
          <a
            key={`source-link-${index}`}
            href={source.src}
            className='full-size-video__video-link'
          >
            {source.mimeTypeUserReadable}
          </a>
        </>
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

  const handleLoadedMetadataDataCanPlayEvents = useMemo(
    () => (autoPlay ? undefined : stopLoading),
    [autoPlay, stopLoading]
  );

  if (sourceElements.length === 0) {
    return null;
  }

  return error ? (
    <p className='full-size-video__error-message'>
      Невозможно воспроизвести видео, но вы можете попробовать его скачать:
      {sourceLinks}
    </p>
  ) : (
    <>
      {loading && (
        <RemoveScroll
          className='full-size-video__full-screen-loading'
          removeScrollBar
          children={null}
        />
      )}
      <video
        className='full-size-video'
        autoPlay={autoPlay}
        muted={autoPlay || muted}
        onEnded={onEnded}
        controls={controls}
        disablePictureInPicture
        controlsList='nodownload nofullscreen'
        preload='metadata'
        onLoadedMetadata={handleLoadedMetadataDataCanPlayEvents}
        onLoadedData={handleLoadedMetadataDataCanPlayEvents}
        onCanPlay={handleLoadedMetadataDataCanPlayEvents}
        onCanPlayThrough={stopLoading}
        onError={handleError}
        onPlay={stopLoading}
        style={style}
        playsInline
        ref={ref}
        loop={loop}
      >
        {sourceElements}
      </video>
    </>
  );
});

export default FullSizeVideo;
