import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import Header from '@/components/revived-paintings/Header/Header';
import { ROUTES } from '@/constants';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import useScrollToHashOnComponentMount from '@/hooks/useScrollToHashOnComponentMount';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { NavLink, useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from 'usehooks-ts';
import './style.scss';

interface PictureWrapperProps {
  animationStyle: object;
  onVisible: (pictureId: string) => void;
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
        onVisible(picture.id);
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
        to={`${ROUTES.REVIVED_PAINTINGS}${ROUTES.PICTURE}/${encodeURIComponent(
          picture.id
        )}?from=${encodeURIComponent(`${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}#${picture.id}`)}`}
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
  const [name, setName] = useState('');
  const [authorAndYear, setAuthorAndYear] = useState('');
  const { loading, markImageAsLoaded } = useImageLoadingState(pictures.length);

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

  return (
    <main className='galos' ref={ref}>
      {loading && <Loading />}
      <Header
        className='galos__overlay-header'
        style={{
          ...animationStyle,
          ...(width !== undefined && { width }),
        }}
      />
      {pictures.map((picture, index) => (
        <PictureWrapper
          key={picture.id}
          animationStyle={animationStyle}
          onVisible={pictureId => {
            setName(picture.name);
            setAuthorAndYear(picture.authorAndYear);
            void navigate({ hash: `#${pictureId}` });
          }}
          picture={picture}
          pictureStyle={
            width === undefined || height === undefined
              ? {}
              : (() => {
                  const minDimension = Math.min(width, height);

                  return {
                    ...animationStyle,
                    minWidth: minDimension,
                    minHeight: minDimension,
                    maxWidth: minDimension,
                    maxHeight: minDimension,
                  };
                })()
          }
          stopLoading={() => {
            markImageAsLoaded(index);
          }}
        />
      ))}
      <div
        className='galos__overlay-main'
        style={{
          ...(width !== undefined && { width }),
          ...(height !== undefined && { minHeight: height }),
        }}
      />
      <div
        className='galos__overlay-circle'
        style={
          width === undefined || height === undefined
            ? {}
            : (() => {
                const minDimension40Percent = Math.min(width, height) * 0.4;

                return {
                  minWidth: minDimension40Percent,
                  minHeight: minDimension40Percent,
                  maxWidth: minDimension40Percent,
                  maxHeight: minDimension40Percent,
                  top: height / 2.0,
                  left: width / 2.0,
                };
              })()
        }
      />
      <div
        className='galos__overlay-info-block'
        style={
          width === undefined || height === undefined
            ? {}
            : {
                maxWidth: width * 0.35,
                top: height / 2.0,
                left: width * 0.55,
                gap: Math.min(width, height) * 0.05,
              }
        }
      >
        <animated.p className='galos__overlay-title' style={textAnimationStyle}>
          {name}
        </animated.p>
        <animated.p className='galos__overlay-author-and-year' style={textAnimationStyle}>
          {authorAndYear}
        </animated.p>
      </div>
    </main>
  );
}

export default Galos;
