import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Loading from '../Loading/Loading';
import SocialNetworkIcon, {
  SocialNetwork,
} from '../SocialNetworkIcon/SocialNetworkIcon';
import logo from './images/logo.svg';
import './style.scss';

const navBarLinkElements = [
  { label: 'Главная', route: ROUTES.DEFAULT },
  { label: 'Галос', route: ROUTES.GALOS },
  { label: 'Контакты', route: ROUTES.CONTACTS },
  { label: 'Каталог', route: ROUTES.CATALOGUE },
  { label: 'Аккаунт', route: ROUTES.ACCOUNT },
  { label: 'О проекте', route: ROUTES.ABOUT },
].map((navBarLink, index) => (
  <NavLink
    key={`nav-bar-link-${index}`}
    className='footer__nav-bar-link'
    to={navBarLink.route}
  >
    {navBarLink.label}
  </NavLink>
));

const socialLinkElements = [
  {
    href: 'https://vk.com/club7412186',
    socialNetwork: 'vk',
  },
  {
    href:
      'https://www.facebook.com/Омский-областной-музей-изобразительных-искусств-имени-МА-Врубеля-358420747675784/',
    socialNetwork: 'facebook',
  },
  {
    href: 'https://www.instagram.com/vrubelmuseum',
    socialNetwork: 'instagram',
  },
  {
    href: 'https://www.tiktok.com/@vrubelmuseum',
    socialNetwork: 'tiktok',
  },
  {
    href: 'https://ok.ru/muzeyimeni',
    socialNetwork: 'ok',
  },
  {
    href: 'https://www.youtube.com/channel/UCP91mcNT5-iftKg7vLx3G9w',
    socialNetwork: 'youtube',
  },
].map((socialLink, index) => (
  <a
    key={`social-link-${index}`}
    className='footer__social-link'
    href={socialLink.href}
  >
    <SocialNetworkIcon
      socialNetwork={socialLink.socialNetwork as SocialNetwork}
    />
  </a>
));

const Footer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const stopLoading = useCallback(() => setLoading(false), []);

  return (
    <footer className='footer'>
      {loading && <Loading />}
      <a className='footer__logo' href='https://vrubel.ru'>
        <img src={logo} alt='Логотип музея' onLoad={stopLoading} />
      </a>
      <nav className='footer__nav-bar'>{navBarLinkElements}</nav>
      <nav className='footer__social-links'>{socialLinkElements}</nav>
      <div className='footer__copyright'>
        <span className='footer__copyright-text'>
          © Омский областной музей изобразительных искусств имени М. А. Врубеля
        </span>
        <a className='footer__copyright-link' href='https://vrubel.ru'>
          vrubel.ru
        </a>
      </div>
    </footer>
  );
};

export default Footer;
