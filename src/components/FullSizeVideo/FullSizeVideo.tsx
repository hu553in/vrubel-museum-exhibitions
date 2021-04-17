import React, { forwardRef, useMemo } from 'react';
import './style.scss';

interface Source {
  src: string;
  mimeType: string;
}

type FitMode = 'cover' | 'contain';

interface Props {
  sources?: Source[];
  onEnded?: () => any;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  objectFit?: FitMode;
  onClick?: React.MouseEventHandler<HTMLVideoElement>;
}

const FullSizeVideo = forwardRef<HTMLVideoElement, Props>((props, ref) => {
  const {
    sources = [],
    onEnded,
    autoPlay = true,
    muted = true,
    controls = false,
    objectFit = 'cover',
    onClick,
  } = props;

  const sourceElements = useMemo(
    () =>
      sources.map((source, index) => (
        <source
          key={`source-${index}`}
          src={source.src}
          type={source.mimeType}
        />
      )),
    [sources]
  );

  const style = useMemo(
    () => ({
      objectFit,
    }),
    [objectFit]
  );

  if (sourceElements.length === 0) {
    return null;
  }

  return (
    <video
      className='full-size-video'
      autoPlay={autoPlay}
      muted={autoPlay || muted}
      onEnded={onEnded}
      controls={controls}
      disablePictureInPicture
      controlsList='nodownload nofullscreen'
      style={style}
      playsInline
      onClick={onClick}
      ref={ref}
    >
      {sourceElements}
      Browser is not suppoted.
    </video>
  );
});

export default FullSizeVideo;
