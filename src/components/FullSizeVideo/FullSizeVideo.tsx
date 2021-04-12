import React from 'react';
import './style.scss';

interface Props {
  webmSrc?: string;
  mp4Src?: string;
  onEnded?: () => any;
  autoPlay?: boolean;
  muted?: boolean;
}

const FullSizeVideo: React.FC<Props> = props => {
  const { webmSrc, mp4Src, onEnded, autoPlay = true, muted = true } = props;
  if (!webmSrc && !mp4Src) {
    return null;
  }
  return (
    <video
      className='full-size-video'
      autoPlay={autoPlay}
      muted={autoPlay || muted}
      onEnded={onEnded}
      playsInline
    >
      {webmSrc && <source src={webmSrc} type='video/webm' />}
      {mp4Src && <source src={mp4Src} type='video/mp4' />}
      Browser is not suppoted.
    </video>
  );
};

export default FullSizeVideo;
