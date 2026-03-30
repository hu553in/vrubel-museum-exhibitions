import { animated, useSpring } from '@react-spring/web';

import Loading from '@/components/common/Loading/Loading';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import left from './assets/images/left.webp';
import middle from './assets/images/middle.webp';
import right from './assets/images/right.webp';
import styles from './style.module.css';

interface Props {
  open: boolean;
}

function Triptih(props: Props) {
  const { open } = props;
  const { loading, getImageLoadHandlers } = useImageLoadingState(3);

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
      <animated.div style={style} className={styles['triptih']}>
        <img
          className={styles['left']}
          src={left}
          alt='Триптих — левая часть'
          {...getImageLoadHandlers(0)}
        />
        <img
          className={styles['middle']}
          src={middle}
          alt='Триптих — средняя часть'
          {...getImageLoadHandlers(1)}
        />
        <img
          className={styles['right']}
          src={right}
          alt='Триптих — правая часть'
          {...getImageLoadHandlers(2)}
        />
      </animated.div>
    </>
  );
}

export default Triptih;
