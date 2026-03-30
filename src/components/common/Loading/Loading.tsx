import Portal from '@/components/common/Portal/Portal';
import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import './style.scss';

const Loading: React.FC = () => {
  return (
    <Portal>
      <RemoveScroll removeScrollBar className='loading'>
        {null}
      </RemoveScroll>
    </Portal>
  );
};

export default Loading;
