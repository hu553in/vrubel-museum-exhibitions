import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Magnifier from 'react-magnifier';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Sound from 'react-sound';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import logo from '../../components/Header/images/logo.svg';
import SideInfoPanel from '../../components/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '../../constants';
import useForceUpdate from '../../hooks/useForceUpdate';
import useUpdateOnResize from '../../hooks/useUpdateOnResize';
import pictures from '../../shared/pictures';
import calculateImageSizeByContainerAndNaturalSizes from '../../utils/calculateImageSizeByContainerAndNaturalSizes';
import './style.scss';

const pause =
  `"data:image/svg+xml,%3Csvg version='1.0' width='80' height='80' ` +
  `xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle style='fill: none; stroke: %23fff; ` +
  `stroke-width: 7.99928; stroke-miterlimit: 4; stroke-dasharray: none; ` +
  `stroke-opacity: 1;' cx='40' cy='40' r='36'/%3E%3Cpath d='M17.991 40.976a6.631 ` +
  `6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0zm24.886 0a6.631 6.631 0 0 ` +
  `1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0z' style='fill: %23fff;' transform='matrix` +
  `(.7772 0 0 .7772 21.5 21.5)'/%3E%3C/svg%3E%0A"`;

const videoCallbackRef = (node: HTMLVideoElement) => node && node.focus();

interface Params {
  id: string;
}

const Picture: React.FC = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const location = useLocation();
  useUpdateOnResize();
  const forceUpdate = useForceUpdate();

  const openedFrom = useMemo(
    () => new URLSearchParams(location.search).get('from'),
    [location.search]
  );

  const picture = useMemo(() => pictures.find(picture => picture.id === id), [
    id,
  ]);

  const animatedSources = useMemo(() => {
    let result = [];
    const { animatedMp4, animatedWebm } = picture ?? {};

    if (animatedMp4) {
      result.push({
        src: animatedMp4,
        mimeType: 'video/mp4',
        mimeTypeUserReadable: 'MP4',
      });
    }

    if (animatedWebm) {
      result.push({
        src: animatedWebm,
        mimeType: 'video/webm',
        mimeTypeUserReadable: 'WebM',
      });
    }

    return result;
  }, [picture]);

  const [playingSoundIndex, setPlayingSoundIndex] = useState(-1);

  const soundElements = useMemo(() => {
    let result: React.ReactNode[] = [];
    const pictureSounds = picture?.sounds ?? [];

    if (pictureSounds.length === 0) {
      return null;
    }

    pictureSounds.forEach((item, index) =>
      result.push(
        <Sound
          key={`sound-${index}`}
          url={item.mp3}
          playStatus={playingSoundIndex === index ? 'PLAYING' : 'STOPPED'}
          volume={100}
          loop
        />
      )
    );

    return result;
  }, [playingSoundIndex, picture?.sounds]);

  const soundButtonsElement = useMemo(() => {
    let result: React.ReactNode[] = [];
    const pictureSounds = picture?.sounds ?? [];

    if (pictureSounds.length === 0) {
      return null;
    }

    pictureSounds.forEach((item, index) => {
      const playingSound = playingSoundIndex === index;

      result.push(
        <button
          key={`sound-button-${index}`}
          aria-label={item.name}
          className='picture__sound-button'
          style={{
            backgroundImage: `url(${playingSound ? pause : item.icon})`,
          }}
          onClick={() =>
            setPlayingSoundIndex(playingSoundIndex === index ? -1 : index)
          }
        />
      );
    });

    return <section className='picture__sound-buttons'>{result}</section>;
  }, [playingSoundIndex, picture?.sounds]);

  const handleReturnClick = useCallback(() => {
    if (openedFrom) {
      history.push(openedFrom);
    } else {
      history.goBack();
    }
  }, [history, openedFrom]);

  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const openInfoPanel = useCallback(() => setInfoPanelOpen(true), []);
  const closeInfoPanel = useCallback(() => setInfoPanelOpen(false), []);

  const [pictureStateRef, setPictureStateRef] = useState<HTMLElement | null>(
    null
  );

  const [magnifierStateRef, setMagnifierStateRef] = useState<
    | (HTMLElement & {
        img: HTMLImageElement;
      })
    | null
  >(null);

  const magnifierCallbackRef = useCallback(
    node => setMagnifierStateRef(node),
    []
  );

  const pictureCallbackRef = useCallback(node => setPictureStateRef(node), []);

  const { clientWidth, clientHeight } = pictureStateRef ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  const {
    naturalWidth: magnifierNaturalWidth,
    naturalHeight: magnifierNaturalHeight,
  } = magnifierStateRef?.img ?? {
    naturalWidth: 0,
    naturalHeight: 0,
  };

  const { width: magnifierWidth, height: magnifierHeight } = useMemo(
    () =>
      !clientWidth ||
      !clientHeight ||
      !magnifierNaturalWidth ||
      !magnifierNaturalHeight
        ? { width: 0, height: 0 }
        : calculateImageSizeByContainerAndNaturalSizes(
            clientWidth,
            clientHeight,
            magnifierNaturalWidth,
            magnifierNaturalHeight
          ),
    [clientHeight, clientWidth, magnifierNaturalHeight, magnifierNaturalWidth]
  );

  const magnifierPresent = useMemo(() => !!picture?.magnifier, [
    picture?.magnifier,
  ]);

  const [magnifierLoading, setMagnifierLoading] = useState(magnifierPresent);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMagnifierLoading(magnifierPresent), []);

  useEffect(() => {
    const handler = () => {
      forceUpdate();
      setMagnifierLoading(false);
    };

    magnifierStateRef?.img?.addEventListener('load', handler);
    return () => magnifierStateRef?.img?.removeEventListener('load', handler);
  }, [forceUpdate, magnifierStateRef?.img]);

  const magnifierElement = useMemo(
    () =>
      magnifierPresent ? (
        <Magnifier
          className='picture__magnifier'
          src={picture!.magnifier!}
          mgWidth={200}
          mgHeight={200}
          mgTouchOffsetX={0}
          mgTouchOffsetY={0}
          mgShowOverflow={false}
          ref={magnifierCallbackRef}
          width={magnifierWidth}
          height={magnifierHeight}
          // @ts-ignore
          style={{
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
          }}
          // @ts-ignore
          alt={picture.name}
        />
      ) : null,
    [
      magnifierPresent,
      picture,
      magnifierCallbackRef,
      magnifierWidth,
      magnifierHeight,
    ]
  );

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  if (!picture || (animatedSources.length === 0 && !magnifierElement)) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }

  return (
    <main className='picture' ref={pictureCallbackRef}>
      <header className='picture__header'>
        <NavLink to={ROUTES.DEFAULT} className='picture__homepage-link'>
          <img className='picture__logo' src={logo} alt='Логотип музея' />
        </NavLink>
        {soundButtonsElement}
        <section className='picture__control-buttons'>
          <button
            aria-label='Вернуться назад'
            className='picture__control-button picture__control-button_return'
            onClick={handleReturnClick}
          />
          <button
            aria-label='Информация о картине'
            className='picture__control-button picture__control-button_info'
            onClick={openInfoPanel}
          />
        </section>
      </header>
      {soundElements}
      {magnifierLoading && <div className='picture__magnifier-loading' />}
      {magnifierElement}
      {animatedSources.length > 0 && (
        <FullSizeVideo
          sources={animatedSources}
          controls
          autoPlay={false}
          objectFit='contain'
          ref={videoCallbackRef}
          loop
          oneHundredPercentHeight={false}
        />
      )}
      <SideInfoPanel
        open={infoPanelOpen}
        onClose={closeInfoPanel}
        header={picture.name}
        subheader={picture.authorAndYear}
        paragraphs={picture.descriptionParagraphs}
        parentElement={rootElement}
      />
    </main>
  );
};

export default Picture;
