import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import Title from '@/components/revived-paintings/Title/Title';
import Triptih from '@/components/revived-paintings/Triptih/Triptih';
import { ROUTES } from '@/constants';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';
import triptihMp4 from './assets/videos/triptih.mp4';
import triptihWebm from './assets/videos/triptih.webm';
import './style.scss';

const triptihVideoSources = [
  {
    src: triptihMp4,
    mimeType: 'video/mp4',
    mimeTypeUserReadable: 'MP4',
  },
  {
    src: triptihWebm,
    mimeType: 'video/webm',
    mimeTypeUserReadable: 'WebM',
  },
];

const Intro: React.FC = () => {
  const [shouldShowTriptihVideo, setShouldShowTriptihVideo] = useState(true);
  const [shouldRedirectToGalos, setShouldRedirectToGalos] = useState(false);

  const [shouldNotFadeOutTriptihAndTitle, setShouldNotFadeOutTriptihAndTitle] = useState(true);

  const onVideoEnded = useCallback(() => {
    setShouldShowTriptihVideo(false);
    setTimeout(() => setShouldNotFadeOutTriptihAndTitle(false), 2750);
    setTimeout(() => setShouldRedirectToGalos(true), 5000);
  }, []);

  const handleWindowKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ' && event.code === 'Space' && shouldShowTriptihVideo) {
        onVideoEnded();
      }
    },
    [onVideoEnded, shouldShowTriptihVideo]
  );

  useEventListener('keydown', handleWindowKeyDown);

  if (shouldRedirectToGalos) {
    return <Navigate to={`${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}`} replace />;
  }

  return (
    <main className='intro'>
      {shouldShowTriptihVideo ? (
        <>
          <FullSizeVideo sources={triptihVideoSources} onEnded={onVideoEnded} />
          <div className='intro__controls'>
            <p className='intro__hint'>Нажмите пробел для пропуска</p>
            <button type='button' className='intro__skip-button' onClick={onVideoEnded}>
              Пропустить
            </button>
          </div>
        </>
      ) : (
        <>
          <Triptih open={shouldNotFadeOutTriptihAndTitle} />
          <Title open={shouldNotFadeOutTriptihAndTitle} />
        </>
      )}
    </main>
  );
};

export default Intro;
