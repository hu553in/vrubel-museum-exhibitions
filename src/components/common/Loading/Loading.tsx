import './style.scss';

import { RemoveScroll } from 'react-remove-scroll';

import Portal from '@/components/common/Portal/Portal';

function Loading() {
  return (
    <Portal>
      <RemoveScroll removeScrollBar className='loading'>
        <div className='loading__status' role='status' aria-live='polite' aria-busy='true'>
          <span className='loading__status-text'>Загрузка</span>
        </div>
      </RemoveScroll>
    </Portal>
  );
}

export default Loading;
