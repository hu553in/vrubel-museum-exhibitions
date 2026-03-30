import { useScrollLock } from 'usehooks-ts';

import Portal from '@/components/common/Portal/Portal';

import styles from './style.module.css';

function Loading() {
  useScrollLock();

  return (
    <Portal>
      <div className={styles['loading']}>
        <div className={styles['status']} role='status' aria-live='polite' aria-busy='true'>
          <span className='srOnly'>Загрузка</span>
        </div>
      </div>
    </Portal>
  );
}

export default Loading;
