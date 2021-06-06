import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { ROUTES } from '../../constants';
import pictures from '../../shared/pictures';
import './style.scss';

const Catalogue: React.FC = () => {
  const [loadingArray, setLoadingArray] = useState(
    Array(pictures.length).fill(true)
  );

  const catalogueLinkElements = useMemo(
    () =>
      pictures.map((picture, index) => (
        <NavLink
          key={`catalogue-link-${index}`}
          to={`${ROUTES.PICTURE}/${encodeURIComponent(picture.id)}?from=${
            ROUTES.CATALOGUE
          }`}
        >
          <img
            className={'catalogue__picture'}
            src={picture.preview}
            alt={picture.name}
            onLoad={() => {
              setLoadingArray(loadingArray => {
                let clonedLoadingArray = [...loadingArray];
                clonedLoadingArray[index] = false;
                return clonedLoadingArray;
              });
            }}
          />
        </NavLink>
      )),
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
