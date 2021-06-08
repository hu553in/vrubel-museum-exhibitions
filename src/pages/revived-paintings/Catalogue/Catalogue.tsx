import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../../components/common/Loading/Loading';
import { ROUTES } from '../../../constants';
import pictures from '../../../assets/revived-paintings/pictures';
import './style.scss';

const initialLoadingArray = Array(pictures.length).fill(true);

const Catalogue: React.FC = () => {
  const [loadingArray, setLoadingArray] = useState(initialLoadingArray);

  useEffect(() => {
    setLoadingArray(initialLoadingArray);
  }, []);

  const catalogueLinkElements = useMemo(
    () =>
      pictures.map((picture, index) => {
        const stopLoading = () =>
          setLoadingArray(loadingArray => {
            let clonedLoadingArray = [...loadingArray];
            clonedLoadingArray[index] = false;
            return clonedLoadingArray;
          });

        return (
          <NavLink
            className='catalogue__picture-link'
            key={`catalogue-link-${index}`}
            to={`${ROUTES.REVIVED_PAINTINGS}${
              ROUTES.PICTURE
            }/${encodeURIComponent(picture.id)}?from=${
              ROUTES.REVIVED_PAINTINGS
            }${ROUTES.CATALOGUE}`}
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
              <span className='catalogue__picture-author-and-year'>
                {picture.authorAndYear}
              </span>
            </p>
          </NavLink>
        );
      }),
    []
  );

  const loading = useMemo(
    () => loadingArray.reduce((carry, current) => carry || current, false),
    [loadingArray]
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
