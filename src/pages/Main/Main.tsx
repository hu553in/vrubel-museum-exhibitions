import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import Title from '../../components/Title/Title';
import Triptih from '../../components/Triptih/Triptih';
import { ROUTES } from '../../constants';
import './style.scss';
import triptihMp4 from './videos/triptih.mp4';
import triptihWebm from './videos/triptih.webm';

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

const Main: React.FC = () => {
  const [shouldShowTriptihVideo, setShouldShowTriptihVideo] = useState(true);
  const [shouldRedirectToGalos, setShouldRedirectToGalos] = useState(false);

  const [
    shouldNotFadeOutTriptihAndTitle,
    setShouldNotFadeOutTriptihAndTitle,
  ] = useState(true);

  const hideTriptihVideo = useCallback(() => {
    setShouldShowTriptihVideo(false);
  }, []);

  const handleVideoEnded = useCallback(() => {
    hideTriptihVideo();
    setTimeout(() => setShouldNotFadeOutTriptihAndTitle(false), 2750);
    setTimeout(() => setShouldRedirectToGalos(true), 5000);
  }, [hideTriptihVideo]);

  useEffect(() => {
    setShouldShowTriptihVideo(true);
    setShouldRedirectToGalos(false);
    return hideTriptihVideo;
  }, [hideTriptihVideo]);

  if (shouldRedirectToGalos) {
    return <Redirect to={ROUTES.GALOS} />;
  }

  return (
    <main className='main'>
      {shouldShowTriptihVideo ? (
        <FullSizeVideo
          sources={triptihVideoSources}
          onEnded={handleVideoEnded}
        />
      ) : (
        <>
          <Triptih open={shouldNotFadeOutTriptihAndTitle} />
          <Title open={shouldNotFadeOutTriptihAndTitle} />
        </>
      )}
    </main>
  );
};

export default Main;
