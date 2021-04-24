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

const Gallery: React.FC = () => {
  const [shouldShowTriptihVideo, setShouldShowTriptihVideo] = useState(true);
  const [shouldRedirectToGallery, setShouldRedirectToGallery] = useState(false);

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
    setTimeout(() => setShouldRedirectToGallery(true), 5000);
  }, [hideTriptihVideo]);

  useEffect(() => {
    setShouldShowTriptihVideo(true);
    setShouldRedirectToGallery(false);
    return hideTriptihVideo;
  }, [hideTriptihVideo]);

  if (shouldRedirectToGallery) {
    return <Redirect to={ROUTES.GALLERY} />;
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

export default Gallery;
