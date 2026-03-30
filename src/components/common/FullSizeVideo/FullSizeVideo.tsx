import Loading from '@/components/common/Loading/Loading';
import usePageVisibility from '@/hooks/usePageVisibility';
import getAppRootElement from '@/utils/getAppRootElement';
import { type CSSProperties, type Ref, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import './style.scss';

interface Source {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
}

type FitMode = 'cover' | 'contain';

interface Props {
  sources?: Source[];
  onEnded?: () => void;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  objectFit?: FitMode;
  loop?: boolean;
  oneHundredPercentHeight?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLVideoElement>;
}

function FullSizeVideo(props: Props) {
  const {
    ref,
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
  const stopLoading = () => {
    setLoading(false);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const localRef = useRef<HTMLVideoElement | null>(null);
  const isVisible = usePageVisibility();
  const playPromise = useRef<Promise<void> | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      if (isVisible) {
        playPromise.current = localRef.current?.play();
      } else {
        if (playPromise.current) {
          void playPromise.current
            .then(() => {
              localRef.current?.pause();
            })
            .catch(() => undefined);
        } else {
          localRef.current?.pause();
        }
      }
    }
  }, [localRef, isVisible, loading]);

  const rootElement = getAppRootElement();
  const { clientHeight: rootElementHeight } = rootElement ?? {};
  const onLoadedMetadataDataCanPlayEvents = autoPlay ? undefined : stopLoading;

  if (!rootElement || sources.length === 0) {
    return null;
  }

  return error ? (
    <p className='full-size-video__error-message'>
      Невозможно воспроизвести видео, но вы можете попробовать его скачать:
      {sources.map(source => (
        <span key={source.src}>
          <br />
          <a href={source.src} className='full-size-video__video-link'>
            {source.mimeTypeUserReadable}
          </a>
        </span>
      ))}
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
        onLoadedMetadata={onLoadedMetadataDataCanPlayEvents}
        onLoadedData={onLoadedMetadataDataCanPlayEvents}
        onCanPlay={onLoadedMetadataDataCanPlayEvents}
        onCanPlayThrough={stopLoading}
        onError={onError}
        onPlay={stopLoading}
        style={{
          objectFit,
          maxHeight: rootElementHeight,
          ...(oneHundredPercentHeight ? { height: '100%' } : {}),
          ...style,
        }}
        playsInline
        ref={mergeRefs([ref, localRef])}
        loop={loop}
      >
        {sources.map(source => (
          <source key={source.src} src={source.src} type={source.mimeType} />
        ))}
      </video>
    </>
  );
}

export default FullSizeVideo;
