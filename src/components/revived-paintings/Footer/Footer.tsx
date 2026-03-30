import './style.scss';

import { NavLink } from 'react-router-dom';

import Loading from '@/components/common/Loading/Loading';
import SocialNetworkIcon from '@/components/common/SocialNetworkIcon/SocialNetworkIcon';
import { footerSocialLinks } from '@/data/footerSocialLinks';
import { revivedPaintingsNavLinks } from '@/data/revivedPaintingsNavLinks';
import useMediaLoadState from '@/hooks/useMediaLoadState';

import logo from './assets/images/logo.svg';

function Footer() {
  const { loading, handleLoad, handleError } = useMediaLoadState(logo);

  return (
    <footer className='footer'>
      {loading && <Loading />}
      <a className='footer__logo' href='https://vrubel.ru' aria-label='Официальный сайт музея'>
        <img src={logo} alt='Логотип музея' onLoad={handleLoad} onError={handleError} />
      </a>
      <nav className='footer__nav-bar'>
        {revivedPaintingsNavLinks.map(navBarLink => (
          <NavLink key={navBarLink.route} className='footer__nav-bar-link' to={navBarLink.route}>
            {navBarLink.label}
          </NavLink>
        ))}
      </nav>
      <nav className='footer__social-links'>
        {footerSocialLinks.map(socialLink => (
          <a
            key={socialLink.href}
            className='footer__social-link'
            href={socialLink.href}
            aria-label={socialLink.ariaLabel}
          >
            <SocialNetworkIcon socialNetwork={socialLink.socialNetwork} />
          </a>
        ))}
      </nav>
      <div className='footer__copyright'>
        <span className='footer__copyright-text'>
          © Омский областной музей изобразительных искусств имени М. А. Врубеля
        </span>
        <a className='footer__copyright-link' href='https://vrubel.ru'>
          vrubel.ru
        </a>
      </div>
      <a
        className='footer__personal-data-processing-policy-link'
        href={`${import.meta.env.BASE_URL}personal_data_processing_policy.pdf`}
      >
        Политика обработки персональных данных
      </a>
    </footer>
  );
}

export default Footer;
