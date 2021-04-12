import { useSpring, animated } from 'react-spring';
import React from 'react';
import './style.scss';

const Title: React.FC = () => {
  const style = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 750,
    config: {
      duration: 1500,
    },
  });
  return (
    <animated.div style={style} className='title'>
      <p className='title__first-line'>Выставка</p>
      <p className='title__second-line'>«Ожившие картины»</p>
      <p className='title__third-line'>Музей им. М.А. Врубеля</p>
    </animated.div>
  );
};

export default Title;
