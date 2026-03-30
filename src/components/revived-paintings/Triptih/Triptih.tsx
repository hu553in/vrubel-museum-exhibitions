import Loading from '@/components/common/Loading/Loading';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import React, { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import left from './assets/images/left.webp';
import middle from './assets/images/middle.webp';
import right from './assets/images/right.webp';
import './style.scss';

interface Props {
  open: boolean;
}

const Triptih: React.FC<Props> = props => {
  const { open } = props;
  const { loading, markImageAsLoaded } = useImageLoadingState(3);

  const imageElements = useMemo(
    () => [
      <img
        key='triptih-left'
        className='triptih__left'
        src={left}
        alt='Триптих — левая часть'
        onLoad={() => markImageAsLoaded(0)}
        onError={() => markImageAsLoaded(0)}
      />,
      <img
        key='triptih-middle'
        className='triptih__middle'
        src={middle}
        alt='Триптих — средняя часть'
        onLoad={() => markImageAsLoaded(1)}
        onError={() => markImageAsLoaded(1)}
      />,
      <img
        key='triptih-right'
        className='triptih__right'
        src={right}
        alt='Триптих — правая часть'
        onLoad={() => markImageAsLoaded(2)}
        onError={() => markImageAsLoaded(2)}
      />,
    ],
    [markImageAsLoaded]
  );

  const style = useSpring({
    opacity: open ? 1 : 0,
    from: { opacity: 0 },
    delay: 750,
    config: {
      duration: 1500,
    },
  });

  return (
    <>
      {loading && <Loading />}
      <animated.div style={style} className='triptih'>
        {imageElements}
      </animated.div>
    </>
  );
};

export default Triptih;
