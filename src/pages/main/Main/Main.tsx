import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import Loading from '@/components/common/Loading/Loading';
import Title from '@/components/main/Title/Title';
import { ROUTES } from '@/constants';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import first from './assets/images/first.webp';
import second from './assets/images/second.webp';
import styles from './style.module.css';

function Main() {
  const { width, height } = useWindowSize();
  const { loading, getImageLoadHandlers } = useImageLoadingState(2);

  return (
    <main className={cn(styles['main'], width <= height ? styles['portrait'] : null)}>
      {loading && <Loading />}
      <img
        className={styles['mainBackground']}
        src={first}
        alt='Первая часть фона'
        {...getImageLoadHandlers(0)}
      />
      <img
        className={styles['mainBackground']}
        src={second}
        alt='Вторая часть фона'
        {...getImageLoadHandlers(1)}
      />
      <Title />
      <NavLink
        className={cn(styles['mainLink'], styles['linkFirst'])}
        to={ROUTES.REVIVED_PAINTINGS}
      >
        «Ожившие картины»
      </NavLink>
      <span className={cn(styles['mainLink'], styles['linkSecond'])}>Гостевые выставки</span>
    </main>
  );
}

export default Main;
