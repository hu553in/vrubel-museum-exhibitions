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

const Footer: React.FC = () => (
  <footer className='footer'>
    <section className='footer__first-row-wrapper'>
      <a className='footer__logo-link' href='https://vrubel.ru'>
        <img src={logo} alt='Логотип музея' />
      </a>
      <nav className='footer__nav-bar'>
        <NavLink className='footer__link footer__link' to={ROUTES.DEFAULT}>
          Главная
        </NavLink>
        <NavLink className='footer__link footer__link' to={ROUTES.CONTACTS}>
          Контакты
        </NavLink>
        <NavLink className='footer__link footer__link' to={ROUTES.CATALOGUE}>
          Каталог
        </NavLink>
        <NavLink className='footer__link footer__link' to={ROUTES.ABOUT}>
          О проекте
        </NavLink>
      </nav>
      <nav className='footer__social-links'>
        <a className='footer__social-link' href='https://vk.com/club7412186'>
          <img className='footer__social-icon' src={vk} alt='Логотип музея' />
        </a>
        <a
          className='footer__social-link'
          href='https://www.facebook.com/%D0%9E%D0%BC%D1%81%D0%BA%D0%B8%D0%B9-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%BD%D0%BE%D0%B9-%D0%BC%D1%83%D0%B7%D0%B5%D0%B9-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2-%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-%D0%9C%D0%90-%D0%92%D1%80%D1%83%D0%B1%D0%B5%D0%BB%D1%8F-358420747675784/'
        >
          <img
            className='footer__social-icon'
            src={facebook}
            alt='Логотип музея'
          />
        </a>
        <a
          className='footer__social-link'
          href='https://www.instagram.com/vrubelmuseum'
        >
          <img
            className='footer__social-icon'
            src={instagram}
            alt='Логотип музея'
          />
        </a>
        <a
          className='footer__social-link'
          href='https://www.tiktok.com/@vrubelmuseum'
        >
          <img
            className='footer__social-icon'
            src={tiktok}
            alt='Логотип музея'
          />
        </a>
        <a className='footer__social-link' href='https://ok.ru/muzeyimeni'>
          <img className='footer__social-icon' src={ok} alt='Логотип музея' />
        </a>
        <a
          className='footer__social-link'
          href='https://www.youtube.com/channel/UCP91mcNT5-iftKg7vLx3G9w'
        >
          <img
            className='footer__social-icon'
            src={youtube}
            alt='Логотип музея'
          />
        </a>
      </nav>
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
