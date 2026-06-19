import { animated, SpringValue } from '@react-spring/web';
import cn from 'classnames';
import type { CSSProperties } from 'react';
import { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/common/icons/museum-mark.svg';
import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';
import { revivedPaintingsNavLinks } from '@/data/revivedPaintingsNavLinks';

import styles from './style.module.css';

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
    <animated.header style={style} className={cn(styles['header'], className)}>
      <NavLink to={ROUTES.DEFAULT} className='brandLink' aria-label='Перейти на главную страницу'>
        <img className='brandLogo' src={logo} alt='Логотип музея' />
      </NavLink>
      <button
        type='button'
        aria-label='Открыть навигационное меню'
        aria-haspopup='dialog'
        aria-expanded={menuOpen}
        className={styles['menuButton']}
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
