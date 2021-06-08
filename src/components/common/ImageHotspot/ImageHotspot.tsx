import React, { CSSProperties, useMemo } from 'react';
import './style.scss';

export interface Props {
  x: number;
  y: number;
  content: React.ReactNode;
}

const ImageHotspot: React.FC<Props> = props => {
  const { x, y, content } = props;

  const style = useMemo(
    () =>
      ({
        top: `${y}%`,
        left: `${x}%`,
      } as CSSProperties),
    [x, y]
  );

  return (
    <div className='image-hotspot' style={style}>
      {content}
    </div>
  );
};

export default ImageHotspot;
