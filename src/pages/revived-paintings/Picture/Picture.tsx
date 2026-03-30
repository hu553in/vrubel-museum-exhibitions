import pictures from '@/assets/revived-paintings/pictures';
import logo from '@/assets/common/icons/museum-mark.svg';
import pause from '@/assets/common/icons/control-pause.svg';
import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import ImageHotspots from '@/components/common/ImageHotspots/ImageHotspots';
import Magnifier from '@/components/common/Magnifier/Magnifier';
import SideInfoPanel from '@/components/common/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '@/constants';
import getAppRootElement from '@/utils/getAppRootElement';
import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sound from 'react-sound';
import './style.scss';

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

interface VideoSource {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
}

type PictureImageHotspot = NonNullable<
  NonNullable<(typeof pictures)[number]['imageHotspots']>
>[number];

const Picture: React.FC = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const location = useLocation();

  const openedFrom = useMemo(
    () => new URLSearchParams(location.search).get('from'),
    [location.search]
  );

  const picture = useMemo(() => pictures.find(picture => picture.id === id), [id]);

  const {
    preview,
    name,
    animated,
    imageHotspots,
    descriptionParagraphs,
    authorAndYear,
    sounds,
    magnifier,
    animatedVariations,
  } = picture ?? {};

  const animatedSources = useMemo(() => {
    let result: VideoSource[] = [];
    const { mp4, webm } = animated ?? {};

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

    return result;
  }, [animated]);

  const [playingSoundIndex, setPlayingSoundIndex] = useState(-1);

  const soundElements = useMemo(() => {
    if (!sounds) {
      return null;
    }

    return sounds.map((item, index) => (
      <Sound
        key={`sound-${index}`}
        url={item.mp3}
        playStatus={playingSoundIndex === index ? 'PLAYING' : 'STOPPED'}
        volume={100}
        loop
      />
    ));
  }, [playingSoundIndex, sounds]);

  const soundButtonElements = useMemo(() => {
    if (!sounds) {
      return null;
    }

    return sounds.map((item, index) => {
      const playingSound = playingSoundIndex === index;

      return (
        <button
          key={`sound-button-${index}`}
          type='button'
          aria-label={`${playingSound ? 'Остановить' : 'Включить'} аудиофрагмент «${item.name}»`}
          aria-pressed={playingSound}
          className='picture__sound-button'
          style={{
            backgroundImage: `url('${playingSound ? pause : item.icon}')`,
          }}
          onClick={() => setPlayingSoundIndex(playingSound ? -1 : index)}
        />
      );
    });
  }, [playingSoundIndex, sounds]);

  const animatedVariationsPresent = useMemo(
    () => animatedVariations && animatedVariations.length > 0,
    [animatedVariations]
  );

  const [playingAnimatedVariationIndex, setPlayingAnimatedVariationIndex] = useState(
    animatedVariationsPresent ? 0 : undefined
  );

  useEffect(() => {
    setPlayingAnimatedVariationIndex(animatedVariationsPresent ? 0 : undefined);
  }, [animatedVariationsPresent]);

  const animatedVariationVideoElement = useMemo(() => {
    if (!animatedVariationsPresent) {
      return null;
    }

    const { mp4, webm, name } = animatedVariations![playingAnimatedVariationIndex!] ?? {};

    if (!name) {
      return null;
    }

    let sources: VideoSource[] = [];

    if (mp4) {
      sources.push({
        src: mp4,
        mimeType: 'video/mp4',
        mimeTypeUserReadable: 'MP4',
      });
    }

    if (webm) {
      sources.push({
        src: webm,
        mimeType: 'video/webm',
        mimeTypeUserReadable: 'WebM',
      });
    }

    if (sources.length === 0) {
      return null;
    }

    return (
      <FullSizeVideo
        key={`animated-variation-video-${name}`}
        sources={sources}
        objectFit='contain'
        ref={videoCallbackRef}
        loop
      />
    );
  }, [animatedVariations, animatedVariationsPresent, playingAnimatedVariationIndex]);

  const animatedVariationButtonElements = useMemo(() => {
    if (!animatedVariationsPresent) {
      return null;
    }

    return animatedVariations!.map((item, index) => {
      const playingAnimatedVariation = playingAnimatedVariationIndex === index;

      const classNameToUse = cn('picture__animated-variation-button', {
        'picture__animated-variation-button_active': playingAnimatedVariation,
      });

      return (
        <button
          key={`animated-variation-button-${index}`}
          type='button'
          aria-label={`Показать анимацию «${item.name}»`}
          aria-pressed={playingAnimatedVariation}
          className={classNameToUse}
          style={{
            backgroundImage: `url('${item.icon}')`,
          }}
          onClick={() => {
            if (!playingAnimatedVariation) {
              setPlayingAnimatedVariationIndex(index);
            }
          }}
        />
      );
    });
  }, [animatedVariations, animatedVariationsPresent, playingAnimatedVariationIndex]);

  const onReturnClick = useCallback(() => {
    if (openedFrom) {
      navigate(openedFrom);
    } else {
      navigate(-1);
    }
  }, [navigate, openedFrom]);

  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const openInfoPanel = useCallback(() => setInfoPanelOpen(true), []);
  const closeInfoPanel = useCallback(() => setInfoPanelOpen(false), []);

  const [pictureStateRef, setPictureStateRef] = useState<HTMLElement | null>(null);

  const pictureCallbackRef = useCallback(
    (node: HTMLElement | null) => setPictureStateRef(node),
    []
  );
  const magnifierPresent = useMemo(() => name && magnifier, [magnifier, name]);

  const animatedVideosPresent = useMemo(() => animatedSources.length > 0, [animatedSources.length]);

  const imageHotspotsPresent = useMemo(
    () => preview && name && imageHotspots && imageHotspots.length > 0,
    [imageHotspots, name, preview]
  );

  const openImageHotspotVideo = useCallback((imageHotspot: PictureImageHotspot) => {
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

  const [playingImageHotspotVideoSources, setPlayingImageHotspotVideoSources] = useState<
    VideoSource[] | undefined
  >();

  const playingImageHotspotVideoPresent = useMemo(
    () => playingImageHotspotVideoSources && playingImageHotspotVideoSources.length > 0,
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
                type='button'
                aria-label={`Открыть видеофрагмент «${imageHotspot.name}»`}
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
      (animatedVideosPresent ||
        magnifierPresent ||
        imageHotspotsPresent ||
        animatedVariationsPresent),
    [
      animatedVariationsPresent,
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

  const dynamicButtonsPresent = useMemo(
    () =>
      (animatedVariationButtonElements && animatedVariationButtonElements.length > 0) ||
      (soundButtonElements && soundButtonElements.length > 0),
    [animatedVariationButtonElements, soundButtonElements]
  );

  const rootElement = getAppRootElement();

  if (!rootElement) {
    return null;
  }

  if (!picturePresent) {
    return <Navigate to={ROUTES.DEFAULT} replace />;
  }

  return (
    <main className='picture' ref={pictureCallbackRef}>
      {soundElements}
      <header className='picture__header'>
        <NavLink to={ROUTES.DEFAULT} className='picture__homepage-link'>
          <img className='picture__logo' src={logo} alt='Логотип музея' />
        </NavLink>
        {dynamicButtonsPresent && (
          <section className='picture__dynamic-buttons'>
            {animatedVariationButtonElements}
            {soundButtonElements}
          </section>
        )}
        <section className='picture__control-buttons'>
          <button
            type='button'
            aria-label='Вернуться на предыдущую страницу'
            className='picture__control-button picture__control-button_return'
            onClick={onReturnClick}
          />
          <button
            type='button'
            aria-label='Открыть информацию о картине'
            aria-haspopup='dialog'
            aria-expanded={infoPanelOpen}
            className='picture__control-button picture__control-button_info'
            onClick={openInfoPanel}
          />
        </section>
      </header>
      {animatedVideosPresent && (
        <FullSizeVideo sources={animatedSources} objectFit='contain' ref={videoCallbackRef} loop />
      )}
      {magnifierPresent && (
        <Magnifier parentElement={pictureStateRef} name={name!} magnifier={magnifier!} />
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
          contentLabel='Диалог с видеофрагментом картины'
        >
          <button
            type='button'
            aria-label='Закрыть диалог с видеофрагментом'
            className='picture__image-hotspot-video-close-button'
            onClick={closeImageHotspotVideo}
          />
          <FullSizeVideo
            sources={playingImageHotspotVideoSources}
            objectFit='contain'
            ref={videoCallbackRef}
            loop
          />
        </Modal>
      )}
      {animatedVariationsPresent && animatedVariationVideoElement}
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
