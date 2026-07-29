import { NavLink } from 'react-router';

import Loading from '@/components/common/Loading/Loading';
import SocialNetworkIcon from '@/components/common/SocialNetworkIcon/SocialNetworkIcon';
import { footerSocialLinks } from '@/data/footerSocialLinks';
import { revivedPaintingsNavLinks } from '@/data/revivedPaintingsNavLinks';
import useMediaLoadState from '@/hooks/useMediaLoadState';

import logo from './assets/images/logo.svg';
import styles from './style.module.css';

function Footer() {
  const { loading, handleLoad, handleError } = useMediaLoadState(logo);

  return (
    <footer className={styles['footer']}>
      {loading && <Loading />}
      <a className={styles['logo']} href='https://vrubel.ru' aria-label='Официальный сайт музея'>
        <img src={logo} alt='Логотип музея' onLoad={handleLoad} onError={handleError} />
      </a>
      <nav className={styles['navBar']} aria-label='Навигация по разделам выставки'>
        {revivedPaintingsNavLinks.map(navBarLink => (
          <NavLink
            key={navBarLink.route}
            className={styles['navBarLink'] ?? ''}
            to={navBarLink.route}
          >
            {navBarLink.label}
          </NavLink>
        ))}
      </nav>
      <nav className={styles['socialLinks']} aria-label='Социальные сети музея'>
        {footerSocialLinks.map(socialLink => (
          <a
            key={socialLink.href}
            className={styles['socialLink']}
            href={socialLink.href}
            aria-label={socialLink.ariaLabel}
          >
            <SocialNetworkIcon socialNetwork={socialLink.socialNetwork} />
          </a>
        ))}
      </nav>
      <div className={styles['copyright']}>
        <span className={styles['copyrightText']}>
          © Омский областной музей изобразительных искусств имени М. А. Врубеля
        </span>
        <a className={styles['copyrightLink']} href='https://vrubel.ru'>
          vrubel.ru
        </a>
      </div>
      <a
        className={styles['personalDataProcessingPolicyLink']}
        href={`${import.meta.env.BASE_URL}personal_data_processing_policy.pdf`}
      >
        Политика обработки персональных данных
      </a>
    </footer>
  );
}

export default Footer;
