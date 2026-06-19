import { animated, useSpring } from '@react-spring/web';

import styles from './style.module.css';

interface Props {
  open: boolean;
}

function Title(props: Props) {
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
    <animated.h1 style={style} className={styles['revivedPaintingsTitle']}>
      <span className={styles['firstLine']}>Выставка</span>
      <span className={styles['secondLine']}>«Ожившие картины»</span>
      <span className={styles['thirdLine']}>Музей им. М. А. Врубеля</span>
    </animated.h1>
  );
}

export default Title;
