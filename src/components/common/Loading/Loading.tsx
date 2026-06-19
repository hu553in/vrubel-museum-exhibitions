import { RemoveScroll } from 'react-remove-scroll';

import Portal from '@/components/common/Portal/Portal';

import styles from './style.module.css';

function Loading() {
  return (
    <Portal>
      <RemoveScroll>
        <div className={styles['loading']}>
          <div className={styles['status']} role='status' aria-live='polite' aria-busy='true'>
            <span className='srOnly'>Загрузка</span>
          </div>
        </div>
      </RemoveScroll>
    </Portal>
  );
}

export default Loading;
