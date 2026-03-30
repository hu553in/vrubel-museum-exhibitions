import { useEffect, useRef, useState } from 'react';

const TITLE_FADE_DELAY_MS = 2750;
const REDIRECT_DELAY_MS = 5000;

function useIntroFlow() {
  const [shouldShowTriptihVideo, setShouldShowTriptihVideo] = useState(true);
  const [shouldRedirectToGalos, setShouldRedirectToGalos] = useState(false);
  const [shouldNotFadeOutTriptihAndTitle, setShouldNotFadeOutTriptihAndTitle] = useState(true);
  const timeoutsRef = useRef<number[]>([]);

  const onVideoEnded = () => {
    if (!shouldShowTriptihVideo) {
      return;
    }

    setShouldShowTriptihVideo(false);
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setShouldNotFadeOutTriptihAndTitle(false);
      }, TITLE_FADE_DELAY_MS)
    );
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setShouldRedirectToGalos(true);
      }, REDIRECT_DELAY_MS)
    );
  };

  useEffect(
    () => () => {
      timeoutsRef.current.forEach(timeoutId => {
        window.clearTimeout(timeoutId);
      });
    },
    []
  );

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' && event.code === 'Space' && shouldShowTriptihVideo) {
      onVideoEnded();
    }
  };

  return {
    shouldShowTriptihVideo,
    shouldRedirectToGalos,
    shouldNotFadeOutTriptihAndTitle,
    onVideoEnded,
    handleWindowKeyDown,
  };
}

export default useIntroFlow;
