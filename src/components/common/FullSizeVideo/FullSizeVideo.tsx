import {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import { usePageVisibility } from 'react-page-visibility';
import mergeRefs from 'react-merge-refs';
import Loading from '../Loading/Loading';
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
  style?: CSSProperties;
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
    style,
  } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, []);

  const stopLoading = useCallback(() => setLoading(false), []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const localRef = useRef<HTMLVideoElement | null>(null);
  const refToUse = mergeRefs([ref, localRef]);
  const isVisible = usePageVisibility();
  const playPromise = useRef<Promise<void> | undefined>();

  useEffect(() => {
    if (isVisible) {
      playPromise.current = localRef?.current?.play();
    } else {
      if (playPromise.current) {
        playPromise.current?.then(() => localRef?.current?.pause());
      } else {
        localRef?.current?.pause();
      }
    }
  }, [localRef, isVisible]);

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

  const rootElement = document.getElementById('root');
  const { clientHeight: rootElementHeight } = rootElement ?? {};

  const styleToUse = useMemo(
    () => ({
      objectFit,
      maxHeight: rootElementHeight,
      ...(oneHundredPercentHeight && { height: '100%' }),
      ...style,
    }),
    [objectFit, oneHundredPercentHeight, rootElementHeight, style]
  );

  const handleLoadedMetadataDataCanPlayEvents = useMemo(
    () => (autoPlay ? undefined : stopLoading),
    [autoPlay, stopLoading]
  );

  if (!rootElement || sourceElements.length === 0) {
    return null;
  }

  return error ? (
    <p className='full-size-video__error-message'>
      Невозможно воспроизвести видео, но вы можете попробовать его скачать:
      {sourceLinks}
    </p>
  ) : (
    <>
      {loading && <Loading />}
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
        style={styleToUse}
        playsInline
        ref={refToUse}
        loop={loop}
      >
        {sourceElements}
      </video>
    </>
  );
});

export default FullSizeVideo;
