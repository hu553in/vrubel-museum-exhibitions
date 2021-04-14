import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import SideMenu from '../SideMenu/SideMenu';
import logo from './images/logo.svg';
import './style.scss';

const sideMenuLinks = [
  { dest: ROUTES.DEFAULT, label: 'Главная' },
  { dest: ROUTES.CONTACTS, label: 'Контакты' },
  { dest: ROUTES.CATALOGUE, label: 'Каталог' },
  { dest: ROUTES.ABOUT, label: 'О проекте' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), [setMenuOpen]);
  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  const rootEl = document.getElementById('root');
  if (!rootEl) return null;

  return (
    <header className='header'>
      <NavLink to={ROUTES.DEFAULT} className='header__homepage-link'>
        <img className='header__logo' src={logo} alt='Логотип музея' />
      </NavLink>
      <button className='header__menu-button' onClick={openMenu} />
      <SideMenu
        open={menuOpen}
        onClose={closeMenu}
        links={sideMenuLinks}
        parentEl={rootEl}
      />
    </header>
  );
};

export default Header;
