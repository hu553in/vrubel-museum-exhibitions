import './style.scss';

import { NavLink } from 'react-router-dom';

import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import { buildPictureRoute } from '@/utils/pictureRoutes';

function Catalogue() {
  const { loading, markImageAsLoaded } = useImageLoadingState(pictures.length);

  return (
    <main className='catalogue'>
      {loading && <Loading />}
      <p className='catalogue__title'>«Ожившие картины»</p>
      <section className='catalogue__body'>
        {pictures.map((picture, index) => {
          const stopLoading = () => {
            markImageAsLoaded(index);
          };

          return (
            <NavLink
              className='catalogue__picture-link'
              key={picture.id}
              to={buildPictureRoute(picture.id, '/revived-paintings/catalogue')}
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
        })}
      </section>
    </main>
  );
}

export default Catalogue;
