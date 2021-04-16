import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import logo from './images/logo.svg';
import ok from './images/ok.png';
import tiktok from './images/tiktok.png';
import vk from './images/vk.png';
import youtube from './images/youtube.png';
import './style.scss';

const navBarLinkElements = [
  {
    label: 'Главная',
    route: ROUTES.DEFAULT,
  },
  {
    label: 'Контакты',
    route: ROUTES.CONTACTS,
  },
  {
    label: 'Каталог',
    route: ROUTES.CATALOGUE,
  },
  {
    label: 'О проекте',
    route: ROUTES.ABOUT,
  },
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
    icon: vk,
    iconAlt: 'VK музея',
  },
  {
    href:
      'https://www.facebook.com/Омский-областной-музей-изобразительных-искусств-имени-МА-Врубеля-358420747675784/',
    icon: facebook,
    iconAlt: 'Facebook музея',
  },
  {
    href: 'https://www.instagram.com/vrubelmuseum',
    icon: instagram,
    iconAlt: 'Instagram музея',
  },
  {
    href: 'https://www.tiktok.com/@vrubelmuseum',
    icon: tiktok,
    iconAlt: 'TikTok музея',
  },
  {
    href: 'https://ok.ru/muzeyimeni',
    icon: ok,
    iconAlt: 'Odnoklassniki музея',
  },
  {
    href: 'https://www.youtube.com/channel/UCP91mcNT5-iftKg7vLx3G9w',
    icon: youtube,
    iconAlt: 'YouTube музея',
  },
].map((socialLink, index) => (
  <a
    key={`social-link-${index}`}
    className='footer__social-link'
    href={socialLink.href}
  >
    <img
      className='footer__social-link-icon'
      src={socialLink.icon}
      alt={socialLink.iconAlt}
    />
  </a>
));

const Footer: React.FC = () => (
  <footer className='footer'>
    <section className='footer__first-row-wrapper'>
      <a className='footer__logo' href='https://vrubel.ru'>
        <img src={logo} alt='Логотип музея' />
      </a>
      <nav className='footer__nav-bar'>{navBarLinkElements}</nav>
      <nav className='footer__social-links'>{socialLinkElements}</nav>
    </section>
    <div className='footer__copyright'>
      <span className='footer__copyright-text'>
        © Омский областной музей изобразительных искусств имени М.А. Врубеля
      </span>
      <a className='footer__copyright-link' href='https://vrubel.ru'>
        vrubel.ru
      </a>
    </div>
  </footer>
);

export default Footer;
