import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { animated, SpringValue } from 'react-spring';
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

interface Props {
  className?: string;
  style?:
    | React.CSSProperties
    | (Omit<React.CSSProperties, 'opacity'> & {
        opacity?: SpringValue<number>;
      });
}

const Header: React.FC<Props> = props => {
  const { className = '', style } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    return null;
  }

  const classNameToUse = cn('header', {
    [className]: className.length > 0,
  });

  return (
    <animated.header style={style} className={classNameToUse}>
      <NavLink to={ROUTES.DEFAULT} className='header__homepage-link'>
        <img className='header__logo' src={logo} alt='Логотип музея' />
      </NavLink>
      <button
        aria-label='Открыть меню'
        className='header__menu-button'
        onClick={openMenu}
      />
      <SideMenu
        open={menuOpen}
        onClose={closeMenu}
        links={sideMenuLinks}
        parentElement={rootElement}
      />
    </animated.header>
  );
};

export default Header;
