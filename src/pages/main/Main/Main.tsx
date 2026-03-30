import Loading from '@/components/common/Loading/Loading';
import Title from '@/components/main/Title/Title';
import { ROUTES } from '@/constants';
import cn from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import first from './assets/images/first.webp';
import second from './assets/images/second.webp';
import './style.scss';

const initialLoadingArray = Array(2).fill(true);

const Main: React.FC = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const [loadingArray, setLoadingArray] = useState(initialLoadingArray);

  const loading = useMemo(
    () => loadingArray.reduce((carry, current) => carry || current, false),
    [loadingArray]
  );

  const uncheckLoadingArrayItem = useCallback((index: number) => {
    setLoadingArray(loadingArray => {
      let clonedLoadingArray = [...loadingArray];
      clonedLoadingArray[index] = false;
      return clonedLoadingArray;
    });
  }, []);

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
        onLoad={() => uncheckLoadingArrayItem(0)}
        onError={() => uncheckLoadingArrayItem(0)}
      />,
      <img
        key='main-background-second'
        className='main__background'
        src={second}
        alt='Вторая часть фона'
        onLoad={() => uncheckLoadingArrayItem(1)}
        onError={() => uncheckLoadingArrayItem(1)}
      />,
    ],
    [uncheckLoadingArrayItem]
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
