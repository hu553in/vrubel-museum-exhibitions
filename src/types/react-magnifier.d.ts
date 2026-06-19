declare module 'react-magnifier' {
  import * as React from 'react';

  export interface MagnifierProps {
    src: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    zoomImgSrc?: string;
    zoomFactor?: number;
    mgWidth?: number;
    mgHeight?: number;
    mgBorderWidth?: number;
    mgShape?: 'circle' | 'square';
    mgShowOverflow?: boolean;
    mgMouseOffsetX?: number;
    mgMouseOffsetY?: number;
    mgTouchOffsetX?: number;
    mgTouchOffsetY?: number;
    style?: React.CSSProperties;
    alt?: string;
  }

  export default class Magnifier extends React.Component<MagnifierProps> {
    img?: HTMLImageElement | null;
  }
}
