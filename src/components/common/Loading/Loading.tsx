import Portal from '@/components/common/Portal/Portal';
import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import './style.scss';

const Loading: React.FC = () => {
  return (
    <Portal>
      <RemoveScroll removeScrollBar className='loading'>
        <div className='loading__status' role='status' aria-live='polite' aria-busy='true'>
          <span className='loading__status-text'>Загрузка</span>
        </div>
      </RemoveScroll>
    </Portal>
  );
};

export default Loading;
