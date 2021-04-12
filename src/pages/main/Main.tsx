import { useCallback, useEffect, useState } from 'react';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import Title from '../../components/Title/Title';
import Triptih from '../../components/Triptih/Triptih';
import welcome from './videos/welcome.webm';
import './style.scss';

const Main = () => {
  const [shouldShowWelcomeVideo, setShouldShowWelcomeVideo] = useState(true);
  const hideWelcomeVideo = useCallback(
    () => setShouldShowWelcomeVideo(false),
    []
  );
  useEffect(() => {
    setShouldShowWelcomeVideo(true);
    return hideWelcomeVideo;
  }, [hideWelcomeVideo]);
  return (
    <main className='main'>
      {shouldShowWelcomeVideo ? (
        <FullSizeVideo webmSrc={welcome} onEnded={hideWelcomeVideo} />
      ) : (
        <>
          <Triptih />
          <Title />
        </>
      )}
    </main>
  );
};

export default Main;
