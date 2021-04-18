import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import pictures from '../../shared/pictures';
import './style.scss';

const catalogueLinkElements = pictures.map((picture, index) => {
  return (
    <NavLink
      key={`catalogue-link-${index}`}
      to={`${ROUTES.PICTURE}/${picture.id}?from=${ROUTES.CATALOGUE}`}
    >
      <img
        className={'catalogue__picture'}
        src={picture.preview}
        alt={picture.name}
      />
    </NavLink>
  );
});

const Catalogue: React.FC = () => {
  return (
    <main className='catalogue'>
      <p className='catalogue__title'>«Ожившие картины»</p>
      <section className='catalogue__body'>{catalogueLinkElements}</section>
    </main>
  );
};

export default Catalogue;