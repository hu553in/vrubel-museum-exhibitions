import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const Catalogue: React.FC = () => {
  const { loading, markImageAsLoaded } = useImageLoadingState(pictures.length);

  const catalogueLinkElements = useMemo(
    () =>
      pictures.map((picture, index) => {
        const stopLoading = () => markImageAsLoaded(index);

        return (
          <NavLink
            className='catalogue__picture-link'
            key={`catalogue-link-${index}`}
            to={`${ROUTES.REVIVED_PAINTINGS}${ROUTES.PICTURE}/${encodeURIComponent(
              picture.id
            )}?from=${ROUTES.REVIVED_PAINTINGS}${ROUTES.CATALOGUE}`}
          >
            <img
              className='catalogue__picture'
              src={picture.preview}
              alt={picture.name}
              onLoad={stopLoading}
              onError={stopLoading}
            />
            <p className='catalogue__picture-info'>
              <span className='catalogue__picture-name'>{picture.name}</span>
              <span className='catalogue__picture-author-and-year'>{picture.authorAndYear}</span>
            </p>
          </NavLink>
        );
      }),
    [markImageAsLoaded]
  );

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    return null;
  }

  return (
    <main className='catalogue'>
      {loading && <Loading />}
      <p className='catalogue__title'>«Ожившие картины»</p>
      <section className='catalogue__body'>{catalogueLinkElements}</section>
    </main>
  );
};

export default Catalogue;
