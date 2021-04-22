import React, { useCallback, useMemo, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import FullSizeVideo from '../../components/FullSizeVideo/FullSizeVideo';
import logo from '../../components/Header/images/logo.svg';
import SideInfoPanel from '../../components/SideInfoPanel/SideInfoPanel';
import { ROUTES } from '../../constants';
import pictures from '../../shared/pictures';
import './style.scss';

const videoCallbackRef = (node: HTMLVideoElement) => node && node.focus();

interface Params {
  id: string;
}

const Picture: React.FC = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const location = useLocation();

  const openedFrom = useMemo(
    () => new URLSearchParams(location.search).get('from'),
    [location.search]
  );

  const picture = useMemo(() => pictures.find(picture => picture.id === id), [
    id,
  ]);

  const animatedSources = useMemo(() => {
    let result = [];
    const { animatedWebm, animatedMp4 } = picture ?? {};

    if (animatedWebm) {
      result.push({
        src: animatedWebm,
        mimeType: 'video/webm',
      });
    }

    if (animatedMp4) {
      result.push({
        src: animatedMp4,
        mimeType: 'video/mp4',
      });
    }

    return result;
  }, [picture]);

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

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  if (!picture || animatedSources.length === 0) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }

  return (
    <main className='picture'>
      <header className='picture__header'>
        <NavLink to={ROUTES.DEFAULT} className='picture__homepage-link'>
          <img className='picture__logo' src={logo} alt='Логотип музея' />
        </NavLink>
        <section className='picture__buttons'>
          <button
            aria-label='Вернуться назад'
            className='picture__return-button'
            onClick={handleReturnClick}
          />
          <button
            aria-label='Информация о картине'
            className='picture__info-button'
            onClick={openInfoPanel}
          />
        </section>
      </header>
      <FullSizeVideo
        sources={animatedSources}
        controls
        autoPlay={false}
        objectFit='contain'
        ref={videoCallbackRef}
        loop
        oneHundredPercentHeight={false}
      />
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
