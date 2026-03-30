import { NavLink } from 'react-router-dom';

import pictures from '@/assets/revived-paintings/pictures';
import Loading from '@/components/common/Loading/Loading';
import useImageLoadingState from '@/hooks/useImageLoadingState';
import { buildPictureRoute } from '@/utils/pictureRoutes';

import styles from './style.module.css';

function Catalogue() {
  const { loading, getImageLoadHandlers } = useImageLoadingState(pictures.length);

  return (
    <main className='pageMain'>
      {loading && <Loading />}
      <p className='pageTitle'>«Ожившие картины»</p>
      <section className={styles['body']}>
        {pictures.map((picture, index) => {
          return (
            <NavLink
              className={styles['pictureLink'] ?? ''}
              key={picture.id}
              to={buildPictureRoute(picture.id, '/revived-paintings/catalogue')}
            >
              <img
                className={styles['picture']}
                src={picture.preview}
                alt={picture.name}
                {...getImageLoadHandlers(index)}
              />
              <p className={styles['pictureInfo']}>
                <span className={styles['pictureName']}>{picture.name}</span>
                <span className={styles['pictureAuthorAndYear']}>{picture.authorAndYear}</span>
              </p>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
}

export default Catalogue;
