import React, { useCallback, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import Loading from '../Loading/Loading';
import left from './images/left.webp';
import middle from './images/middle.webp';
import right from './images/right.webp';
import './style.scss';

interface Props {
  open: boolean;
}

const Triptih: React.FC<Props> = props => {
  const { open } = props;
  const [loadingArray, setLoadingArray] = useState(Array(3).fill(true));

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
        alt='Триптих - левая часть'
        onLoad={() => uncheckLoadingArrayItem(0)}
      />,
      <img
        key='triptih-middle'
        className='triptih__middle'
        src={middle}
        alt='Триптих - средняя часть'
        onLoad={() => uncheckLoadingArrayItem(1)}
      />,
      <img
        key='triptih-right'
        className='triptih__right'
        src={right}
        alt='Триптих - правая часть'
        onLoad={() => uncheckLoadingArrayItem(2)}
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
