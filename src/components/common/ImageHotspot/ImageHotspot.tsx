import './style.scss';

import type { ReactNode } from 'react';

import { createImageHotspotStyle } from '@/utils/imageHotspot';

export interface Props {
  x: number;
  y: number;
  content: ReactNode;
}

function ImageHotspot(props: Props) {
  const { x, y, content } = props;

  return (
    <div className='image-hotspot' style={createImageHotspotStyle(x, y)}>
      {content}
    </div>
  );
}

export default ImageHotspot;
