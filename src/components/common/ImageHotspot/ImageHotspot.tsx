import type { CSSProperties, ReactNode } from 'react';
import './style.scss';

export interface Props {
  x: number;
  y: number;
  content: ReactNode;
}

function ImageHotspot(props: Props) {
  const { x, y, content } = props;
  const style: CSSProperties = {
    top: `${String(y)}%`,
    left: `${String(x)}%`,
  };

  return (
    <div className='image-hotspot' style={style}>
      {content}
    </div>
  );
}

export default ImageHotspot;
