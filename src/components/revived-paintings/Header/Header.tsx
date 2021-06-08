import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { animated, SpringValue } from 'react-spring';
import { ROUTES } from '../../../constants';
import SideMenu from '../../common/SideMenu/SideMenu';
import './style.scss';

const logo =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="58.036" height="58.036"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M8.339 52.758h5.156V31.741h2.212v21.017h4.885V31.741c.127-9.39-12.126-9.39-12.253 0zm28.93 0h5.172V31.741h2.196v21.017h4.901V31.741c.128-9.39-12.141-9.39-12.269 0zm-14.465 0h5.156V31.741h2.275v21.017h4.775V31.741c.127-9.39-12.142-9.39-12.27 0zM0 15.993h58.036V5.278H0zm0 4.919h57.989v-2.763H0z" style="fill: %23fff;"/%3E%3C/svg%3E';

const sideMenuLinks = [
  { label: 'Главная', route: ROUTES.DEFAULT },
  { label: 'Галос', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}` },
  { label: 'Контакты', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CONTACTS}` },
  { label: 'Каталог', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.CATALOGUE}` },
  { label: 'Аккаунт', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ACCOUNT}` },
  { label: 'О проекте', route: `${ROUTES.REVIVED_PAINTINGS}${ROUTES.ABOUT}` },
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

  useEffect(() => {
    setMenuOpen(false);
  }, []);

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
