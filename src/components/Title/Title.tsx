import React from 'react';
import { animated, useSpring } from 'react-spring';
import './style.scss';

interface Props {
  open: boolean;
}

const Title: React.FC<Props> = props => {
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
    <animated.div style={style} className='title'>
      <p className='title__first-line'>Выставка</p>
      <p className='title__second-line'>«Ожившие картины»</p>
      <p className='title__third-line'>Музей им. М. А. Врубеля</p>
    </animated.div>
  );
};

export default Title;
