import './style.scss';

import { animated, useSpring } from '@react-spring/web';

import Loading from '@/components/common/Loading/Loading';
import useImageLoadingState from '@/hooks/useImageLoadingState';

import left from './assets/images/left.webp';
import middle from './assets/images/middle.webp';
import right from './assets/images/right.webp';

interface Props {
  open: boolean;
}

function Triptih(props: Props) {
  const { open } = props;
  const { loading, markImageAsLoaded } = useImageLoadingState(3);

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
        <img
          className='triptih__left'
          src={left}
          alt='Триптих — левая часть'
          onLoad={() => {
            markImageAsLoaded(0);
          }}
          onError={() => {
            markImageAsLoaded(0);
          }}
        />
        <img
          className='triptih__middle'
          src={middle}
          alt='Триптих — средняя часть'
          onLoad={() => {
            markImageAsLoaded(1);
          }}
          onError={() => {
            markImageAsLoaded(1);
          }}
        />
        <img
          className='triptih__right'
          src={right}
          alt='Триптих — правая часть'
          onLoad={() => {
            markImageAsLoaded(2);
          }}
          onError={() => {
            markImageAsLoaded(2);
          }}
        />
      </animated.div>
    </>
  );
}

export default Triptih;
