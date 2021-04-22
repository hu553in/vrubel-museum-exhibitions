import React from 'react';
import { animated, useSpring } from 'react-spring';
import left from './images/left.webp';
import middle from './images/middle.webp';
import right from './images/right.webp';
import './style.scss';

interface Props {
  open: boolean;
}

const Triptih: React.FC<Props> = props => {
  const { open } = props;

  const style = useSpring({
    opacity: open ? 1 : 0,
    from: { opacity: 0 },
    delay: 750,
    config: {
      duration: 1500,
    },
  });

  return (
    <animated.div style={style} className='triptih'>
      <img className='triptih__left' src={left} alt='Триптих - левая часть' />
      <img
        className='triptih__middle'
        src={middle}
        alt='Триптих - средняя часть'
      />
      <img
        className='triptih__right'
        src={right}
        alt='Триптих - правая часть'
      />
    </animated.div>
  );
};

export default Triptih;
