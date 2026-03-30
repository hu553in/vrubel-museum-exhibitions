import { animated, useSpring } from '@react-spring/web';
import './style.scss';

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
    <animated.div style={style} className='revived-paintings-title'>
      <p className='revived-paintings-title__first-line'>Выставка</p>
      <p className='revived-paintings-title__second-line'>«Ожившие картины»</p>
      <p className='revived-paintings-title__third-line'>Музей им. М. А. Врубеля</p>
    </animated.div>
  );
}

export default Title;
