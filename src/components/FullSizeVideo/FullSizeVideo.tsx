import React, { useMemo } from 'react';
import './style.scss';

interface Source {
  src: string;
  mimeType: string;
}

interface Props {
  sources?: Source[];
  onEnded?: () => any;
  autoPlay?: boolean;
  muted?: boolean;
}

const FullSizeVideo: React.FC<Props> = props => {
  const { sources = [], onEnded, autoPlay = true, muted = true } = props;
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
  if (sourceElements.length === 0) {
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
      {sourceElements}
      Browser is not suppoted.
    </video>
  );
};

export default FullSizeVideo;
