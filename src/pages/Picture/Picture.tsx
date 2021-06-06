import React, { useCallback, useMemo, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Sound from 'react-sound';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import logo from '../../components/Header/images/logo.svg';
import ImageHotspots from '../../components/ImageHotspots/ImageHotspots';
import Magnifier from '../../components/Magnifier/Magnifier';
import SideInfoPanel from '../../components/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '../../constants';
import useUpdateOnResize from '../../hooks/useUpdateOnResize';
import pictures from '../../shared/pictures';
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

const imageHotspotVideoStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    position: 'absolute',
  },
  content: {
    backgroundColor: '#000',
    overflow: 'hidden',
    top: '30px',
    left: '30px',
    width: 'calc(100% - 100px)',
    height: 'calc(100% - 100px)',
    borderRadius: 0,
    borderColor: '#d2d2d2',
    minWidth: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
} as Styles;

interface Params {
  id: string;
}

interface VideoSource {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
}

const Picture: React.FC = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const location = useLocation();
  useUpdateOnResize();

  const openedFrom = useMemo(
    () => new URLSearchParams(location.search).get('from'),
    [location.search]
  );

  const picture = useMemo(() => pictures.find(picture => picture.id === id), [
    id,
  ]);

  const {
    preview,
    name,
    imageHotspots,
    descriptionParagraphs,
    authorAndYear,
    sounds,
    magnifier,
  } = picture ?? {};

  const animatedSources = useMemo(() => {
    let result: VideoSource[] = [];
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
    const pictureSounds = sounds ?? [];

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
  }, [playingSoundIndex, sounds]);

  const soundButtonsElement = useMemo(() => {
    let result: React.ReactNode[] = [];
    const pictureSounds = sounds ?? [];

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
  }, [playingSoundIndex, sounds]);

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

  const pictureCallbackRef = useCallback(node => setPictureStateRef(node), []);
  const magnifierPresent = useMemo(() => name && magnifier, [magnifier, name]);

  const animatedVideosPresent = useMemo(() => animatedSources.length > 0, [
    animatedSources.length,
  ]);

  const imageHotspotsPresent = useMemo(
    () => preview && name && imageHotspots && imageHotspots.length > 0,
    [imageHotspots, name, preview]
  );

  const openImageHotspotVideo = useCallback(imageHotspot => {
    let result = [];
    const { mp4, webm } = imageHotspot ?? {};

    if (mp4) {
      result.push({
        src: mp4,
        mimeType: 'video/mp4',
        mimeTypeUserReadable: 'MP4',
      });
    }

    if (webm) {
      result.push({
        src: webm,
        mimeType: 'video/webm',
        mimeTypeUserReadable: 'WebM',
      });
    }

    setPlayingImageHotspotVideoSources(result);
  }, []);

  const closeImageHotspotVideo = useCallback(() => {
    setPlayingImageHotspotVideoSources(undefined);
  }, []);

  const [
    playingImageHotspotVideoSources,
    setPlayingImageHotspotVideoSources,
  ] = useState<VideoSource[] | undefined>();

  const playingImageHotspotVideoPresent = useMemo(
    () =>
      playingImageHotspotVideoSources &&
      playingImageHotspotVideoSources.length > 0,
    [playingImageHotspotVideoSources]
  );

  const modifiedImageHotspots = useMemo(
    () =>
      imageHotspotsPresent
        ? imageHotspots!.map(imageHotspot => ({
            x: imageHotspot.positionPercentage.x * 100,
            y: imageHotspot.positionPercentage.y * 100,
            content: (
              <button
                aria-label={imageHotspot.name}
                className='picture__image-hotspot-button'
                onClick={() => openImageHotspotVideo(imageHotspot)}
              />
            ),
          }))
        : null,
    [imageHotspots, imageHotspotsPresent, openImageHotspotVideo]
  );

  const picturePresent = useMemo(
    () =>
      picture &&
      preview &&
      name &&
      authorAndYear &&
      descriptionParagraphs &&
      (animatedVideosPresent || magnifierPresent || imageHotspotsPresent),
    [
      animatedVideosPresent,
      authorAndYear,
      descriptionParagraphs,
      imageHotspotsPresent,
      magnifierPresent,
      name,
      picture,
      preview,
    ]
  );

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  if (!picturePresent) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }

  return (
    <main className='picture' ref={pictureCallbackRef}>
      {soundElements}
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
      {animatedVideosPresent && (
        <FullSizeVideo
          sources={animatedSources}
          objectFit='contain'
          ref={videoCallbackRef}
          loop
        />
      )}
      {magnifierPresent && (
        <Magnifier
          parentElement={pictureStateRef}
          name={name!}
          magnifier={magnifier!}
        />
      )}
      {imageHotspotsPresent && (
        <ImageHotspots
          parentElement={pictureStateRef}
          src={preview!}
          alt={name!}
          imageHotspots={modifiedImageHotspots!}
        />
      )}
      {playingImageHotspotVideoPresent && (
        <Modal
          isOpen={true}
          onRequestClose={closeImageHotspotVideo}
          style={imageHotspotVideoStyle}
          appElement={rootElement}
        >
          <button
            aria-label='Закрыть видео'
            className='picture__image-hotspot-video-close-button'
            onClick={closeImageHotspotVideo}
          />
          <FullSizeVideo
            sources={playingImageHotspotVideoSources}
            objectFit='contain'
            loop
          />
        </Modal>
      )}
      <SideInfoPanel
        open={infoPanelOpen}
        onClose={closeInfoPanel}
        header={name!}
        subheader={authorAndYear!}
        paragraphs={descriptionParagraphs!}
        parentElement={rootElement}
      />
    </main>
  );
};

export default Picture;
