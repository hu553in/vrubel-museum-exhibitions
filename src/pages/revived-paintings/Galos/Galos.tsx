import './style.scss';

import { animated, useSpring } from '@react-spring/web';
import { useResizeDetector } from 'react-resize-detector';
import { NavLink, useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from 'usehooks-ts';

import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import Header from '@/components/revived-paintings/Header/Header';
import useGalosActivePicture from '@/hooks/useGalosActivePicture';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import useScrollToHashOnComponentMount from '@/hooks/useScrollToHashOnComponentMount';
import getGalosLayout from '@/utils/galosLayout';
import getGalosPictureStyle from '@/utils/galosPictureStyle';
import { buildPictureRoute } from '@/utils/pictureRoutes';

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
      className='galos__picture-wrapper'
      ref={ref}
      style={animationStyle}
    >
      <NavLink
        className='galos__picture-link'
        to={buildPictureRoute(picture.id, `/revived-paintings/galos#${picture.id}`)}
      >
        <img
          style={pictureStyle}
          className='galos__picture'
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
  const { width, height, ref } = useResizeDetector();

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
    <main className='galos' ref={ref}>
      {loading && <Loading />}
      <Header
        className='galos__overlay-header'
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
        className='galos__overlay-main'
        style={{
          ...(galosLayout.main ?? {}),
        }}
      />
      <div className='galos__overlay-circle' style={galosLayout.circle ?? {}} />
      <div className='galos__overlay-info-block' style={galosLayout.infoBlock ?? {}}>
        <animated.p className='galos__overlay-title' style={textAnimationStyle}>
          {activePicture.name}
        </animated.p>
        <animated.p className='galos__overlay-author-and-year' style={textAnimationStyle}>
          {activePicture.authorAndYear}
        </animated.p>
      </div>
    </main>
  );
}

export default Galos;
