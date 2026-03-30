import Loading from '@/components/common/Loading/Loading';
import Title from '@/components/main/Title/Title';
import { ROUTES } from '@/constants';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import first from './assets/images/first.webp';
import second from './assets/images/second.webp';
import './style.scss';

const Main: React.FC = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const { loading, markImageAsLoaded } = useImageLoadingState(2);

  const classNameToUse = useMemo(
    () =>
      cn('main', {
        main_portrait: width <= height,
      }),
    [height, width]
  );

  const imageElements = useMemo(
    () => [
      <img
        key='main-background-first'
        className='main__background'
        src={first}
        alt='Первая часть фона'
        onLoad={() => markImageAsLoaded(0)}
        onError={() => markImageAsLoaded(0)}
      />,
      <img
        key='main-background-second'
        className='main__background'
        src={second}
        alt='Вторая часть фона'
        onLoad={() => markImageAsLoaded(1)}
        onError={() => markImageAsLoaded(1)}
      />,
    ],
    [markImageAsLoaded]
  );

  return (
    <main className={classNameToUse}>
      {loading && <Loading />}
      {imageElements}
      <Title />
      <NavLink className='main__link main__link_first' to={ROUTES.REVIVED_PAINTINGS}>
        «Ожившие картины»
      </NavLink>
      <span className='main__link main__link_second'>Гостевые выставки</span>
    </main>
  );
};

export default Main;
