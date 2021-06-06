import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { ROUTES } from '../../constants';
import useScrollToHashOnComponentMount from '../../hooks/useScrollToHashOnComponentMount';
import useUpdateOnResize from '../../hooks/useUpdateOnResize';
import pictures from '../../shared/pictures';
import './style.scss';

const Gallery: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [authorAndYear, setAuthorAndYear] = useState('');
  const viewportWidthSupported = window.innerWidth >= 360;
  useScrollToHashOnComponentMount();
  useUpdateOnResize();

  const [galleryStateRef, setGalleryStateRef] = useState<HTMLElement | null>(
    null
  );

  const galleryCallbackRef = useCallback(node => setGalleryStateRef(node), []);
  const { clientWidth, clientHeight } = galleryStateRef ?? {};

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

  const overlayHeaderStyle = useMemo(
    () => ({
      ...(viewportWidthSupported && animationStyle),
      ...(galleryStateRef && { width: clientWidth }),
    }),
    [clientWidth, galleryStateRef, animationStyle, viewportWidthSupported]
  );

  const overlayMainStyle = useMemo(
    () => ({
      ...(galleryStateRef && { width: clientWidth, minHeight: clientHeight }),
    }),
    [clientHeight, clientWidth, galleryStateRef]
  );

  const overlayInfoBlockStyle = useMemo(() => {
    if (!galleryStateRef) {
      return {};
    }

    return {
      maxWidth: clientWidth! * 0.35,
      top: clientHeight! / 2.0,
      left: clientWidth! * 0.55,
      gap: Math.min(clientWidth!, clientHeight!) * 0.05,
    };
  }, [clientHeight, clientWidth, galleryStateRef]);

  const overlayCircleStyle = useMemo(() => {
    if (!galleryStateRef) {
      return {};
    }

    const clientMinDimension40Percent =
      Math.min(clientWidth!, clientHeight!) * 0.4;

    return {
      minWidth: clientMinDimension40Percent,
      minHeight: clientMinDimension40Percent,
      maxWidth: clientMinDimension40Percent,
      maxHeight: clientMinDimension40Percent,
      top: clientHeight! / 2.0,
      left: clientWidth! / 2.0,
    };
  }, [clientHeight, clientWidth, galleryStateRef]);

  const pictureStyle = useMemo(() => {
    if (!galleryStateRef) {
      return {};
    }

    const clientMinDimension = Math.min(clientWidth!, clientHeight!);

    return {
      ...animationStyle,
      minWidth: clientMinDimension,
      minHeight: clientMinDimension,
      maxWidth: clientMinDimension,
      maxHeight: clientMinDimension,
    };
  }, [clientHeight, clientWidth, galleryStateRef, animationStyle]);

  const [loadingArray, setLoadingArray] = useState(
    Array(pictures.length).fill(true)
  );

  const pictureWrapperElements = useMemo(
    () =>
      pictures.map((picture, index) => (
        <InView
          key={`picture-${index}`}
          threshold={0.5}
          onChange={(_, entry) => {
            if (entry.isIntersecting) {
              setName(picture.name);
              setAuthorAndYear(picture.authorAndYear);
              history.push(`#${entry.target.id}`);
            }
          }}
        >
          {({ ref }) => (
            <animated.div
              id={picture.id}
              className='gallery__picture-wrapper'
              ref={ref}
              style={animationStyle}
            >
              <NavLink
                className='gallery__picture-link'
                to={`${ROUTES.PICTURE}/${encodeURIComponent(
                  picture.id
                )}?from=/gallery%23${encodeURIComponent(picture.id)}`}
              >
                <img
                  style={pictureStyle}
                  className='gallery__picture'
                  src={picture.preview}
                  alt={picture.name}
                  onLoad={() => {
                    setLoadingArray(loadingArray => {
                      let clonedLoadingArray = [...loadingArray];
                      clonedLoadingArray[index] = false;
                      return clonedLoadingArray;
                    });
                  }}
                />
              </NavLink>
            </animated.div>
          )}
        </InView>
      )),
    [history, pictureStyle, animationStyle]
  );

  const loading = useMemo(
    () => loadingArray.reduce((carry, current) => carry || current, false),
    [loadingArray]
  );

  useEffect(() => {
    if (!viewportWidthSupported) {
      history.push('#');
    }
  }, [history, viewportWidthSupported]);

  const galleryChildren = useMemo(
    () =>
      viewportWidthSupported ? (
        <>
          {pictureWrapperElements}
          <div className='gallery__overlay-main' style={overlayMainStyle} />
          <div className='gallery__overlay-circle' style={overlayCircleStyle} />
          <div
            className='gallery__overlay-info-block'
            style={overlayInfoBlockStyle}
          >
            <animated.p
              className='gallery__overlay-title'
              style={textAnimationStyle}
            >
              {name}
            </animated.p>
            <animated.p
              className='gallery__overlay-author-and-year'
              style={textAnimationStyle}
            >
              {authorAndYear}
            </animated.p>
          </div>
        </>
      ) : (
        <p className='gallery__error-message'>
          Ширина окна браузера не поддерживается, но вы можете перейти на другую
          страницу через меню :)
        </p>
      ),
    [
      viewportWidthSupported,
      pictureWrapperElements,
      overlayMainStyle,
      overlayCircleStyle,
      overlayInfoBlockStyle,
      textAnimationStyle,
      name,
      authorAndYear,
    ]
  );

  return (
    <>
      <main className='gallery' ref={galleryCallbackRef}>
        {loading && <Loading />}
        <Header
          className={'gallery__overlay-header'}
          style={overlayHeaderStyle}
        />
        {galleryChildren}
      </main>
    </>
  );
};

export default Gallery;
