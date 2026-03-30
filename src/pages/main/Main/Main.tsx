import './style.scss';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import Loading from '@/components/common/Loading/Loading';
import Title from '@/components/main/Title/Title';
import { ROUTES } from '@/constants';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import first from './assets/images/first.webp';
import second from './assets/images/second.webp';

function Main() {
  const { width, height } = useWindowSize();
  const { loading, markImageAsLoaded } = useImageLoadingState(2);

  return (
    <main
      className={cn('main', {
        main_portrait: width <= height,
      })}
    >
      {loading && <Loading />}
      <img
        className='main__background'
        src={first}
        alt='Первая часть фона'
        onLoad={() => {
          markImageAsLoaded(0);
        }}
        onError={() => {
          markImageAsLoaded(0);
        }}
      />
      <img
        className='main__background'
        src={second}
        alt='Вторая часть фона'
        onLoad={() => {
          markImageAsLoaded(1);
        }}
        onError={() => {
          markImageAsLoaded(1);
        }}
      />
      <Title />
      <NavLink className='main__link main__link_first' to={ROUTES.REVIVED_PAINTINGS}>
        «Ожившие картины»
      </NavLink>
      <span className='main__link main__link_second'>Гостевые выставки</span>
    </main>
  );
}

export default Main;
