import { type RefObject, useEffect, useRef, useState } from 'react';

interface Props {
  autoPlay: boolean;
  isVisible: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}

function useVideoPlaybackState(props: Props) {
  const { autoPlay, isVisible, videoRef } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const playPromise = useRef<Promise<void> | undefined>(undefined);

  const stopLoading = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    if (!loading) {
      if (isVisible) {
        playPromise.current = videoRef.current?.play();
      } else if (playPromise.current) {
        void playPromise.current
          .then(() => {
            videoRef.current?.pause();
          })
          .catch(() => undefined);
      } else {
        videoRef.current?.pause();
      }
    }
  }, [isVisible, loading, videoRef]);

  return {
    loading,
    error,
    handleError,
    handlePlaybackReady: stopLoading,
    handleMetadataReady: autoPlay ? undefined : stopLoading,
  };
}

export default useVideoPlaybackState;
