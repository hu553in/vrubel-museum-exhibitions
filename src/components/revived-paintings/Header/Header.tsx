import logo from '@/assets/common/icons/museum-mark.svg';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { ROUTES } from '@/constants';
import { animated, SpringValue } from '@react-spring/web';
import cn from 'classnames';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

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
    | CSSProperties
    | (Omit<CSSProperties, 'opacity'> & {
        opacity?: SpringValue<number>;
      });
}

function Header(props: Props) {
  const { className = '', style } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <animated.header
      style={style}
      className={cn('header', {
        [className]: className.length > 0,
      })}
    >
      <NavLink to={ROUTES.DEFAULT} className='header__homepage-link'>
        <img className='header__logo' src={logo} alt='Логотип музея' />
      </NavLink>
      <button
        type='button'
        aria-label='Открыть навигационное меню'
        aria-haspopup='dialog'
        aria-expanded={menuOpen}
        className='header__menu-button'
        onClick={() => {
          setMenuOpen(true);
        }}
      />
      <SideMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
        links={sideMenuLinks}
      />
    </animated.header>
  );
}

export default Header;
