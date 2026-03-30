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
    <animated.div style={style} className={styles['revivedPaintingsTitle']}>
      <p className={styles['firstLine']}>Выставка</p>
      <p className={styles['secondLine']}>«Ожившие картины»</p>
      <p className={styles['thirdLine']}>Музей им. М. А. Врубеля</p>
    </animated.div>
  );
}

export default Title;
