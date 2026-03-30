import { type CSSProperties, type Ref, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Loading from '@/components/common/Loading/Loading';
import usePageVisibility from '@/hooks/usePageVisibility';
import useVideoPlaybackState from '@/hooks/useVideoPlaybackState';
import getAppRootElement from '@/utils/getAppRootElement';

import styles from './style.module.css';

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

  const localRef = useRef<HTMLVideoElement | null>(null);
  const isVisible = usePageVisibility();
  const { loading, error, handleError, handlePlaybackReady, handleMetadataReady } =
    useVideoPlaybackState({
      autoPlay,
      isVisible,
      videoRef: localRef,
    });

  const rootElement = getAppRootElement();
  const { clientHeight: rootElementHeight } = rootElement ?? {};

  if (!rootElement || sources.length === 0) {
    return null;
  }

  return error ? (
    <p className={styles['errorMessage']}>
      Невозможно воспроизвести видео, но вы можете попробовать его скачать:
      {sources.map(source => (
        <span key={source.src}>
          <br />
          <a href={source.src} className={styles['videoLink']}>
            {source.mimeTypeUserReadable}
          </a>
        </span>
      ))}
    </p>
  ) : (
    <>
      {loading && <Loading />}
      <video
        className={styles['fullSizeVideo']}
        autoPlay={autoPlay}
        muted={autoPlay || muted}
        onEnded={onEnded}
        controls={controls}
        disablePictureInPicture
        controlsList='nodownload nofullscreen'
        preload='metadata'
        onLoadedMetadata={handleMetadataReady}
        onLoadedData={handleMetadataReady}
        onCanPlay={handleMetadataReady}
        onCanPlayThrough={handlePlaybackReady}
        onError={handleError}
        onPlay={handlePlaybackReady}
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
