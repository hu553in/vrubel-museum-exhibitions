import './style.scss';

import { animated, SpringValue } from '@react-spring/web';
import cn from 'classnames';
import type { CSSProperties } from 'react';
import { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/common/icons/museum-mark.svg';
import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';
import { revivedPaintingsNavLinks } from '@/data/revivedPaintingsNavLinks';

const SideMenu = lazy(async () => import('@/components/common/SideMenu/SideMenu'));

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
      {menuOpen && (
        <Suspense fallback={<Loading />}>
          <SideMenu
            open={menuOpen}
            onClose={() => {
              setMenuOpen(false);
            }}
            links={revivedPaintingsNavLinks}
          />
        </Suspense>
      )}
    </animated.header>
  );
}

export default Header;
