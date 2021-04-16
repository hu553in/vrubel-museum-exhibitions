import React, { useCallback, useEffect, useState } from 'react';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import Title from '../../components/Title/Title';
import Triptih from '../../components/Triptih/Triptih';
import './style.scss';
import welcomeMp4 from './videos/welcome.mp4';
import welcomeWebm from './videos/welcome.webm';

const welcomeVideoSources = [
  {
    src: welcomeWebm,
    mimeType: 'video/webm',
  },
  {
    src: welcomeMp4,
    mimeType: 'video/mp4',
  },
];

const Main: React.FC = () => {
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
        <FullSizeVideo
          sources={welcomeVideoSources}
          onEnded={hideWelcomeVideo}
        />
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
