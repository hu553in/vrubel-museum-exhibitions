import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import Loading from '../../common/Loading/Loading';
import left from './assets/images/left.webp';
import middle from './assets/images/middle.webp';
import right from './assets/images/right.webp';
import './style.scss';

interface Props {
  open: boolean;
}

const initialLoadingArray = Array(3).fill(true);

const Triptih: React.FC<Props> = props => {
  const { open } = props;
  const [loadingArray, setLoadingArray] = useState(initialLoadingArray);

  useEffect(() => {
    setLoadingArray(initialLoadingArray);
  }, []);

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

  const imageElements = useMemo(
    () => [
      <img
        key='triptih-left'
        className='triptih__left'
        src={left}
        alt='Триптих — левая часть'
        onLoad={() => uncheckLoadingArrayItem(0)}
        onError={() => uncheckLoadingArrayItem(0)}
      />,
      <img
        key='triptih-middle'
        className='triptih__middle'
        src={middle}
        alt='Триптих — средняя часть'
        onLoad={() => uncheckLoadingArrayItem(1)}
        onError={() => uncheckLoadingArrayItem(1)}
      />,
      <img
        key='triptih-right'
        className='triptih__right'
        src={right}
        alt='Триптих — правая часть'
        onLoad={() => uncheckLoadingArrayItem(2)}
        onError={() => uncheckLoadingArrayItem(2)}
      />,
    ],
    [uncheckLoadingArrayItem]
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
