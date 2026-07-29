import cn from 'classnames';
import { lazy, Suspense, useRef, useState } from 'react';
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router';

import pause from '@/assets/common/icons/control-pause.svg';
import logo from '@/assets/common/icons/museum-mark.svg';
import pictures from '@/assets/revived-paintings/pictures';
import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import ImageHotspots from '@/components/common/ImageHotspots/ImageHotspots';
import Loading from '@/components/common/Loading/Loading';
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

import styles from './style.module.css';

const videoCallbackRef = (node: HTMLVideoElement | null) => node?.focus();
const Dialog = lazy(async () => import('@/components/common/Dialog/Dialog'));
const Magnifier = lazy(async () => import('@/components/common/Magnifier/Magnifier'));
const SideInfoPanel = lazy(async () => import('@/components/common/SideInfoPanel/SideInfoPanel'));

interface ActiveImageHotspot {
  name: string;
  videoSources: VideoSource[];
}

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
        ariaLabel={`Анимация картины «${activeAnimatedVariation.name}»`}
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

  const [playingImageHotspot, setPlayingImageHotspot] = useState<ActiveImageHotspot | undefined>();
  const modifiedImageHotspots = createPictureHotspotViewModels(imageHotspots).map(imageHotspot => ({
    x: imageHotspot.x,
    y: imageHotspot.y,
    content: (
      <button
        type='button'
        aria-label={`Открыть видеофрагмент «${imageHotspot.name}»`}
        aria-haspopup='dialog'
        aria-expanded={playingImageHotspot?.name === imageHotspot.name}
        className={styles['imageHotspotButton']}
        onClick={() => {
          setPlayingImageHotspot({
            name: imageHotspot.name,
            videoSources: imageHotspot.videoSources,
          });
        }}
      />
    ),
  }));
  const hasHotspotVideoOpen = Boolean(playingImageHotspot?.videoSources.length);

  const rootElement = getAppRootElement();
  const imageHotspotVideoCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  if (!rootElement) {
    return null;
  }

  if (!hasPictureContent) {
    return <Navigate to={ROUTES.DEFAULT} replace />;
  }

  return (
    <main className={styles['picture']} ref={setPictureStateRef}>
      <header className={styles['header']}>
        <h1 className='srOnly'>{name}</h1>
        <NavLink to={ROUTES.DEFAULT} className='brandLink' aria-label='Перейти на главную страницу'>
          <img className={cn('brandLogo', styles['logo'])} src={logo} alt='Логотип музея' />
        </NavLink>
        {hasDynamicButtons && (
          <section
            className={styles['dynamicButtons']}
            aria-label='Анимации и аудиофрагменты картины'
          >
            {animatedVariations?.map((item, index) => {
              const playingAnimatedVariation = activeAnimatedVariation?.name === item.name;

              return (
                <button
                  key={item.name}
                  type='button'
                  aria-label={`Показать анимацию «${item.name}»`}
                  aria-pressed={playingAnimatedVariation}
                  className={cn(
                    styles['animatedVariationButton'],
                    playingAnimatedVariation ? styles['animatedVariationButtonActive'] : null
                  )}
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
                  className={styles['soundButton']}
                  style={createBackgroundImageStyle(playingSound ? pause : item.icon)}
                  onClick={() => {
                    toggleSound(index);
                  }}
                />
              );
            })}
          </section>
        )}
        <section className={styles['controlButtons']} aria-label='Управление страницей картины'>
          <button
            type='button'
            aria-label='Открыть информацию о картине'
            aria-haspopup='dialog'
            aria-expanded={infoPanelOpen}
            className={cn(styles['controlButton'], styles['controlButtonInfo'])}
            onClick={() => {
              setInfoPanelOpen(true);
            }}
          />
          <button
            type='button'
            aria-label='Вернуться на предыдущую страницу'
            className={cn(styles['controlButton'], styles['controlButtonReturn'])}
            onClick={onReturnClick}
          />
        </section>
      </header>
      {hasAnimatedVideo && (
        <FullSizeVideo
          sources={animatedSources}
          objectFit='contain'
          ariaLabel={
            name ? `Анимированная версия картины «${name}»` : 'Анимированная версия картины'
          }
          ref={videoCallbackRef}
          loop
        />
      )}
      {hasMagnifier && name && magnifier && (
        <Suspense fallback={<Loading />}>
          <Magnifier parentElement={pictureStateRef} name={name} magnifier={magnifier} />
        </Suspense>
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
        <Suspense fallback={<Loading />}>
          <Dialog
            open={hasHotspotVideoOpen}
            onClose={() => {
              setPlayingImageHotspot(undefined);
            }}
            container={rootElement}
            title={`Видеофрагмент «${playingImageHotspot?.name ?? ''}»`}
            description={
              playingImageHotspot?.name
                ? `Полноэкранное воспроизведение видеофрагмента «${playingImageHotspot.name}».`
                : 'Полноэкранное воспроизведение выбранного видеофрагмента картины.'
            }
            panelClassName={styles['imageHotspotVideoPanel'] ?? ''}
            overlayClassName={styles['imageHotspotVideoOverlay'] ?? ''}
            initialFocusRef={imageHotspotVideoCloseButtonRef}
          >
            <button
              type='button'
              ref={imageHotspotVideoCloseButtonRef}
              aria-label='Закрыть диалог с видеофрагментом'
              className={styles['imageHotspotVideoCloseButton']}
              onClick={() => {
                setPlayingImageHotspot(undefined);
              }}
            />
            <FullSizeVideo
              sources={playingImageHotspot?.videoSources ?? []}
              objectFit='contain'
              ref={videoCallbackRef}
              ariaLabel={
                playingImageHotspot?.name
                  ? `Видео фрагмента «${playingImageHotspot.name}»`
                  : 'Видео фрагмента картины'
              }
              loop
            />
          </Dialog>
        </Suspense>
      )}
      {hasAnimatedVariations && animatedVariationVideoElement}
      {name && authorAndYear && descriptionParagraphs && (
        <Suspense fallback={infoPanelOpen ? <Loading /> : null}>
          {infoPanelOpen && (
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
        </Suspense>
      )}
    </main>
  );
}

export default Picture;
