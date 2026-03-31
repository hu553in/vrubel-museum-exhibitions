import { Navigate } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';

import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import Title from '@/components/revived-paintings/Title/Title';
import Triptih from '@/components/revived-paintings/Triptih/Triptih';
import { ROUTES } from '@/constants';
import useIntroFlow from '@/hooks/useIntroFlow';

import triptihMp4 from './assets/videos/triptih.mp4';
import triptihWebm from './assets/videos/triptih.webm';
import styles from './style.module.css';

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

function Intro() {
  const {
    shouldShowTriptihVideo,
    shouldRedirectToGalos,
    shouldNotFadeOutTriptihAndTitle,
    onVideoEnded,
    handleWindowKeyDown,
  } = useIntroFlow();

  useEventListener('keydown', handleWindowKeyDown);

  if (shouldRedirectToGalos) {
    return <Navigate to={`${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}`} replace />;
  }

  return (
    <main className={styles['intro']}>
      {shouldShowTriptihVideo ? (
        <>
          <FullSizeVideo sources={triptihVideoSources} onEnded={onVideoEnded} />
          <div className={styles['controls']}>
            <p className={styles['hint']} id='intro-skip-hint'>
              Нажмите пробел для пропуска
            </p>
            <button
              type='button'
              className={styles['skipButton']}
              aria-describedby='intro-skip-hint'
              onClick={onVideoEnded}
            >
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
}

export default Intro;
