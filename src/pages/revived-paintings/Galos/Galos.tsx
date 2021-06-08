import React, { useEffect, useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { InView } from 'react-intersection-observer';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import Header from '../../../components/revived-paintings/Header/Header';
import Loading from '../../../components/common/Loading/Loading';
import { ROUTES } from '../../../constants';
import useScrollToHashOnComponentMount from '../../../hooks/useScrollToHashOnComponentMount';
import pictures from '../../../assets/revived-paintings/pictures';
import './style.scss';

const initialLoadingArray = Array(pictures.length).fill(true);

const Galos: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [authorAndYear, setAuthorAndYear] = useState('');
  const [loadingArray, setLoadingArray] = useState(initialLoadingArray);

  useEffect(() => {
    setName('');
    setAuthorAndYear('');
    setLoadingArray(initialLoadingArray);
  }, []);

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

  const overlayHeaderStyle = useMemo(
    () => ({
      ...animationStyle,
      ...(width !== undefined && { width }),
    }),
    [animationStyle, width]
  );

  const overlayMainStyle = useMemo(
    () => ({
      ...(width !== undefined && { width }),
      ...(height !== undefined && { minHeight: height }),
    }),
    [height, width]
  );

  const overlayInfoBlockStyle = useMemo(() => {
    if (width === undefined || height === undefined) {
      return {};
    }

    return {
      maxWidth: width! * 0.35,
      top: height! / 2.0,
      left: width! * 0.55,
      gap: Math.min(width!, height!) * 0.05,
    };
  }, [height, width]);

  const overlayCircleStyle = useMemo(() => {
    if (width === undefined || height === undefined) {
      return {};
    }

    const minDimension40Percent = Math.min(width!, height!) * 0.4;

    return {
      minWidth: minDimension40Percent,
      minHeight: minDimension40Percent,
      maxWidth: minDimension40Percent,
      maxHeight: minDimension40Percent,
      top: height! / 2.0,
      left: width! / 2.0,
    };
  }, [height, width]);

  const pictureStyle = useMemo(() => {
    if (width === undefined || height === undefined) {
      return {};
    }

    const minDimension = Math.min(width!, height!);

    return {
      ...animationStyle,
      minWidth: minDimension,
      minHeight: minDimension,
      maxWidth: minDimension,
      maxHeight: minDimension,
    };
  }, [animationStyle, height, width]);

  const pictureWrapperElements = useMemo(
    () =>
      pictures.map((picture, index) => {
        const stopLoading = () =>
          setLoadingArray(loadingArray => {
            let clonedLoadingArray = [...loadingArray];
            clonedLoadingArray[index] = false;
            return clonedLoadingArray;
          });

        return (
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
                className='galos__picture-wrapper'
                ref={ref}
                style={animationStyle}
              >
                <NavLink
                  className='galos__picture-link'
                  to={`${ROUTES.REVIVED_PAINTINGS}${
                    ROUTES.PICTURE
                  }/${encodeURIComponent(picture.id)}?from=${
                    ROUTES.REVIVED_PAINTINGS
                  }${ROUTES.GALOS}%23${encodeURIComponent(picture.id)}`}
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
            )}
          </InView>
        );
      }),
    [history, pictureStyle, animationStyle]
  );

  const loading = useMemo(
    () => loadingArray.reduce((carry, current) => carry || current, false),
    [loadingArray]
  );

  const galosChildren = useMemo(
    () => (
      <>
        {pictureWrapperElements}
        <div className='galos__overlay-main' style={overlayMainStyle} />
        <div className='galos__overlay-circle' style={overlayCircleStyle} />
        <div
          className='galos__overlay-info-block'
          style={overlayInfoBlockStyle}
        >
          <animated.p
            className='galos__overlay-title'
            style={textAnimationStyle}
          >
            {name}
          </animated.p>
          <animated.p
            className='galos__overlay-author-and-year'
            style={textAnimationStyle}
          >
            {authorAndYear}
          </animated.p>
        </div>
      </>
    ),
    [
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
      <main className='galos' ref={ref}>
        {loading && <Loading />}
        <Header className='galos__overlay-header' style={overlayHeaderStyle} />
        {galosChildren}
      </main>
    </>
  );
};

export default Galos;
