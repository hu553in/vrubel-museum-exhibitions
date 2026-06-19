import type { ReactNode } from 'react';

import { createImageHotspotStyle } from '@/utils/imageHotspot';

import styles from './style.module.css';

export interface Props {
  x: number;
  y: number;
  content: ReactNode;
}

function ImageHotspot(props: Props) {
  const { x, y, content } = props;

  return (
    <div className={styles['imageHotspot']} style={createImageHotspotStyle(x, y)}>
      {content}
    </div>
  );
}

export default ImageHotspot;
