import './style.scss';

import cn from 'classnames';
import { useRef, useState } from 'react';
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';

import pause from '@/assets/common/icons/control-pause.svg';
import logo from '@/assets/common/icons/museum-mark.svg';
import pictures from '@/assets/revived-paintings/pictures';
import Dialog from '@/components/common/Dialog/Dialog';
import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import ImageHotspots from '@/components/common/ImageHotspots/ImageHotspots';
import Magnifier from '@/components/common/Magnifier/Magnifier';
import SideInfoPanel from '@/components/common/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '@/constants';
import useAudioFragments from '@/hooks/useAudioFragments';
import { createBackgroundImageStyle } from '@/utils/backgroundImageStyle';
import getAppRootElement from '@/utils/getAppRootElement';
import { getPictureOpenedFrom } from '@/utils/pictureRoutes';
import {
  createPictureHotspotViewModels,
  createVideoSources,
  getActiveAnimatedVariation,
  getPictureCapabilities,
  type VideoSource,
} from '@/utils/pictureScene';

const videoCallbackRef = (node: HTMLVideoElement | null) => node?.focus();

function Picture() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const location = useLocation();
  const openedFrom = getPictureOpenedFrom(location.search);
  const picture = pictures.find(item => item.id === id);

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

  const {
    animatedSources,
    hasAnimatedVariations,
    hasAnimatedVideo,
    hasMagnifier,
    hasImageHotspots,
    hasDynamicButtons,
    hasPictureContent,
  } = getPictureCapabilities({
    preview,
    name,
    authorAndYear,
    descriptionParagraphs,
    animated,
    sounds,
    magnifier,
    animatedVariations,
    imageHotspots,
  });
  const soundSources = sounds?.map(sound => sound.mp3) ?? [];

  const { playingIndex: playingSoundIndex, toggle: toggleSound } = useAudioFragments(soundSources);
  const [requestedAnimatedVariationIndex, setRequestedAnimatedVariationIndex] = useState(0);

  const activeAnimatedVariation = getActiveAnimatedVariation(
    animatedVariations,
    requestedAnimatedVariationIndex
  );
  const animatedVariationSources = createVideoSources(activeAnimatedVariation);
  const animatedVariationVideoElement =
    activeAnimatedVariation?.name && animatedVariationSources.length > 0 ? (
      <FullSizeVideo
        key={`animated-variation-video-${activeAnimatedVariation.name}`}
        sources={animatedVariationSources}
        objectFit='contain'
        ref={videoCallbackRef}
        loop
      />
    ) : null;

  const onReturnClick = () => {
    if (openedFrom) {
      void navigate(openedFrom);
    } else {
      void navigate(-1);
    }
  };

  const [infoPanelOpen, setInfoPanelOpen] = useState(false);

  const [pictureStateRef, setPictureStateRef] = useState<HTMLElement | null>(null);

  const [playingImageHotspotVideoSources, setPlayingImageHotspotVideoSources] = useState<
    VideoSource[] | undefined
  >();
  const modifiedImageHotspots = createPictureHotspotViewModels(imageHotspots).map(imageHotspot => ({
    x: imageHotspot.x,
    y: imageHotspot.y,
    content: (
      <button
        type='button'
        aria-label={`Открыть видеофрагмент «${imageHotspot.name}»`}
        className='picture__image-hotspot-button'
        onClick={() => {
          setPlayingImageHotspotVideoSources(imageHotspot.videoSources);
        }}
      />
    ),
  }));
  const hasHotspotVideoOpen = Boolean(playingImageHotspotVideoSources?.length);

  const rootElement = getAppRootElement();
  const imageHotspotVideoCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  if (!rootElement) {
    return null;
  }

  if (!hasPictureContent) {
    return <Navigate to={ROUTES.DEFAULT} replace />;
  }

  return (
    <main className='picture' ref={setPictureStateRef}>
      <header className='picture__header'>
        <NavLink to={ROUTES.DEFAULT} className='picture__homepage-link'>
          <img className='picture__logo' src={logo} alt='Логотип музея' />
        </NavLink>
        {hasDynamicButtons && (
          <section className='picture__dynamic-buttons'>
            {animatedVariations?.map((item, index) => {
              const playingAnimatedVariation = activeAnimatedVariation?.name === item.name;

              return (
                <button
                  key={item.name}
                  type='button'
                  aria-label={`Показать анимацию «${item.name}»`}
                  aria-pressed={playingAnimatedVariation}
                  className={cn('picture__animated-variation-button', {
                    'picture__animated-variation-button_active': playingAnimatedVariation,
                  })}
                  style={createBackgroundImageStyle(item.icon)}
                  onClick={() => {
                    if (!playingAnimatedVariation) {
                      setRequestedAnimatedVariationIndex(index);
                    }
                  }}
                />
              );
            })}
            {sounds?.map((item, index) => {
              const playingSound = playingSoundIndex === index;

              return (
                <button
                  key={item.mp3}
                  type='button'
                  aria-label={`${playingSound ? 'Остановить' : 'Включить'} аудиофрагмент «${item.name}»`}
                  aria-pressed={playingSound}
                  className='picture__sound-button'
                  style={createBackgroundImageStyle(playingSound ? pause : item.icon)}
                  onClick={() => {
                    toggleSound(index);
                  }}
                />
              );
            })}
          </section>
        )}
        <section className='picture__control-buttons'>
          <button
            type='button'
            aria-label='Открыть информацию о картине'
            aria-haspopup='dialog'
            aria-expanded={infoPanelOpen}
            className='picture__control-button picture__control-button_info'
            onClick={() => {
              setInfoPanelOpen(true);
            }}
          />
          <button
            type='button'
            aria-label='Вернуться на предыдущую страницу'
            className='picture__control-button picture__control-button_return'
            onClick={onReturnClick}
          />
        </section>
      </header>
      {hasAnimatedVideo && (
        <FullSizeVideo sources={animatedSources} objectFit='contain' ref={videoCallbackRef} loop />
      )}
      {hasMagnifier && name && magnifier && (
        <Magnifier parentElement={pictureStateRef} name={name} magnifier={magnifier} />
      )}
      {hasImageHotspots && (
        <ImageHotspots
          parentElement={pictureStateRef}
          src={preview ?? ''}
          alt={name ?? ''}
          imageHotspots={modifiedImageHotspots}
        />
      )}
      {hasHotspotVideoOpen && (
        <Dialog
          open={hasHotspotVideoOpen}
          onClose={() => {
            setPlayingImageHotspotVideoSources(undefined);
          }}
          container={rootElement}
          panelClassName='picture__image-hotspot-video-panel'
          overlayClassName='picture__image-hotspot-video-overlay'
          initialFocusRef={imageHotspotVideoCloseButtonRef}
        >
          <button
            type='button'
            ref={imageHotspotVideoCloseButtonRef}
            aria-label='Закрыть диалог с видеофрагментом'
            className='picture__image-hotspot-video-close-button'
            onClick={() => {
              setPlayingImageHotspotVideoSources(undefined);
            }}
          />
          <FullSizeVideo
            sources={playingImageHotspotVideoSources ?? []}
            objectFit='contain'
            ref={videoCallbackRef}
            loop
          />
        </Dialog>
      )}
      {hasAnimatedVariations && animatedVariationVideoElement}
      {name && authorAndYear && descriptionParagraphs && (
        <SideInfoPanel
          open={infoPanelOpen}
          onClose={() => {
            setInfoPanelOpen(false);
          }}
          header={name}
          subheader={authorAndYear}
          paragraphs={descriptionParagraphs}
          parentElement={rootElement}
        />
      )}
    </main>
  );
}

export default Picture;
