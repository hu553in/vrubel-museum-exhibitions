import './style.scss';

import Portal from '@/components/common/Portal/Portal';

function Loading() {
  return (
    <Portal>
      <div className='loading'>
        <div className='loading__status' role='status' aria-live='polite' aria-busy='true'>
          <span className='loading__status-text'>Загрузка</span>
        </div>
      </div>
    </Portal>
  );
}

export default Loading;
