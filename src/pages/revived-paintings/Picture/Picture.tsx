import pause from '@/assets/common/icons/control-pause.svg';
import logo from '@/assets/common/icons/museum-mark.svg';
import pictures from '@/assets/revived-paintings/pictures';
import Dialog from '@/components/common/Dialog/Dialog';
import FullSizeVideo from '@/components/common/FullSizeVideo/FullSizeVideo';
import ImageHotspots from '@/components/common/ImageHotspots/ImageHotspots';
import Magnifier from '@/components/common/Magnifier/Magnifier';
import SideInfoPanel from '@/components/common/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '@/constants';
import getAppRootElement from '@/utils/getAppRootElement';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sound from 'react-sound';
import './style.scss';

const videoCallbackRef = (node: HTMLVideoElement | null) => node?.focus();

interface VideoSource {
  src: string;
  mimeType: string;
  mimeTypeUserReadable: string;
}

const createVideoSources = (
  sourceSet:
    | {
        mp4?: string;
        webm?: string;
      }
    | undefined
) => {
  const result: VideoSource[] = [];

  if (sourceSet?.mp4) {
    result.push({
      src: sourceSet.mp4,
      mimeType: 'video/mp4',
      mimeTypeUserReadable: 'MP4',
    });
  }

  if (sourceSet?.webm) {
    result.push({
      src: sourceSet.webm,
      mimeType: 'video/webm',
      mimeTypeUserReadable: 'WebM',
    });
  }

  return result;
};

function Picture() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const location = useLocation();
  const openedFrom = new URLSearchParams(location.search).get('from');
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

  const animatedSources = createVideoSources(animated);

  const [playingSoundIndex, setPlayingSoundIndex] = useState(-1);
  const [requestedAnimatedVariationIndex, setRequestedAnimatedVariationIndex] = useState(0);

  const activeAnimatedVariation = !animatedVariations?.length
    ? undefined
    : animatedVariations[Math.min(requestedAnimatedVariationIndex, animatedVariations.length - 1)];
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
  const modifiedImageHotspots = imageHotspots?.map(imageHotspot => ({
    x: imageHotspot.positionPercentage.x * 100,
    y: imageHotspot.positionPercentage.y * 100,
    content: (
      <button
        type='button'
        aria-label={`Открыть видеофрагмент «${imageHotspot.name}»`}
        className='picture__image-hotspot-button'
        onClick={() => {
          setPlayingImageHotspotVideoSources(createVideoSources(imageHotspot));
        }}
      />
    ),
  }));
  const hasAnimatedVariations = Boolean(animatedVariations?.length);
  const hasAnimatedVideo = animatedSources.length > 0;
  const hasMagnifier = Boolean(name && magnifier);
  const hasImageHotspots = Boolean(preview && name && imageHotspots?.length);
  const hasHotspotVideoOpen = Boolean(playingImageHotspotVideoSources?.length);
  const hasDynamicButtons = Boolean((animatedVariations?.length ?? 0) || (sounds?.length ?? 0));
  const hasPictureContent = Boolean(
    picture &&
    preview &&
    name &&
    authorAndYear &&
    descriptionParagraphs &&
    (hasAnimatedVideo || hasMagnifier || hasImageHotspots || hasAnimatedVariations)
  );

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
      {sounds?.map((item, index) => (
        <Sound
          key={item.mp3}
          url={item.mp3}
          playStatus={playingSoundIndex === index ? 'PLAYING' : 'STOPPED'}
          volume={100}
          loop
        />
      ))}
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
                  style={{
                    backgroundImage: `url('${item.icon}')`,
                  }}
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
                  style={{
                    backgroundImage: `url('${playingSound ? pause : item.icon}')`,
                  }}
                  onClick={() => {
                    setPlayingSoundIndex(playingSound ? -1 : index);
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
          imageHotspots={modifiedImageHotspots ?? []}
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
