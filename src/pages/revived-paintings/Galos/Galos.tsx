import { animated, useSpring } from '@react-spring/web';
import { type RefObject, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useIntersectionObserver, useResizeObserver } from 'usehooks-ts';

import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import Header from '@/components/revived-paintings/Header/Header';
import useGalosActivePicture from '@/hooks/useGalosActivePicture';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import useScrollToHashOnComponentMount from '@/hooks/useScrollToHashOnComponentMount';
import getGalosLayout from '@/utils/galosLayout';
import getGalosPictureStyle from '@/utils/galosPictureStyle';
import { buildPictureRoute } from '@/utils/pictureRoutes';

import styles from './style.module.css';

interface PictureWrapperProps {
  animationStyle: object;
  onVisible: () => void;
  picture: (typeof pictures)[number];
  pictureStyle: object;
  stopLoading: () => void;
}

function PictureWrapper({
  animationStyle,
  onVisible,
  picture,
  pictureStyle,
  stopLoading,
}: PictureWrapperProps) {
  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: isIntersecting => {
      if (isIntersecting) {
        onVisible();
      }
    },
  });

  return (
    <animated.div
      id={picture.id}
      className={styles['pictureWrapper']}
      ref={ref}
      style={animationStyle}
    >
      <NavLink
        className={styles['pictureLink'] ?? ''}
        to={buildPictureRoute(picture.id, `/revived-paintings/galos#${picture.id}`)}
      >
        <img
          style={pictureStyle}
          className={styles['picture']}
          src={picture.preview}
          alt={picture.name}
          onLoad={stopLoading}
          onError={stopLoading}
        />
      </NavLink>
    </animated.div>
  );
}

function Galos() {
  const navigate = useNavigate();
  const { activePicture, onPictureVisible } = useGalosActivePicture(navigate);
  const { loading, getImageLoadHandlers } = useImageLoadingState(pictures.length);

  useScrollToHashOnComponentMount();
  const ref = useRef<HTMLElement>(null);
  const { width = 0, height = 0 } = useResizeObserver({
    ref: ref as RefObject<HTMLElement>,
  });

  const animationStyle = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 750,
    config: {
      duration: 1500,
    },
  });

  const textAnimationStyle = useSpring({
    color: '#fff',
    from: { color: '#000' },
    delay: 750,
    config: {
      duration: 1500,
    },
  });
  const galosLayout = getGalosLayout(width, height);

  return (
    <main className={styles['galos']} ref={ref}>
      <h1 className='srOnly'>Галерея выставки «Ожившие картины»</h1>
      {loading && <Loading />}
      <Header
        className={styles['overlayHeader'] ?? ''}
        style={{
          ...animationStyle,
          ...(galosLayout.headerWidth !== undefined && { width: galosLayout.headerWidth }),
        }}
      />
      {pictures.map((picture, index) => (
        <PictureWrapper
          key={picture.id}
          animationStyle={animationStyle}
          onVisible={() => {
            onPictureVisible(picture);
          }}
          picture={picture}
          pictureStyle={getGalosPictureStyle(galosLayout.pictureSize, animationStyle)}
          stopLoading={() => {
            getImageLoadHandlers(index).onLoad();
          }}
        />
      ))}
      <div
        className={styles['overlayMain']}
        style={{
          ...(galosLayout.main ?? {}),
        }}
      />
      <div className={styles['overlayCircle']} style={galosLayout.circle ?? {}} />
      <div className={styles['overlayInfoBlock']} style={galosLayout.infoBlock ?? {}}>
        <animated.h2 className={styles['overlayTitle']} style={textAnimationStyle}>
          {activePicture.name}
        </animated.h2>
        <animated.p className={styles['overlayAuthorAndYear']} style={textAnimationStyle}>
          {activePicture.authorAndYear}
        </animated.p>
      </div>
    </main>
  );
}

export default Galos;
