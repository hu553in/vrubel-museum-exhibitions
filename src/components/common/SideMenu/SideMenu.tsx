import Dialog from '@/components/common/Dialog/Dialog';
import cn from 'classnames';
import { useId, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './style.scss';

interface Link {
  label: string;
  route: string;
  external?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  links: Link[];
}

function SideMenu(props: Props) {
  const { open, onClose, links } = props;
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      panelClassName={cn('side-menu', {
        'side-menu_open': open,
      })}
      overlayClassName='side-menu-overlay'
      labelledBy={titleId}
      initialFocusRef={closeButtonRef}
    >
      <h2 className='side-menu__title' id={titleId}>
        Навигационное меню
      </h2>
      {links.map(link => {
        const { label, route, external = false } = link;
        const className = cn('side-menu__link', {
          'side-menu__link_active': route === location.pathname,
        });

        return external ? (
          <a key={route} className={className} href={route} onClick={onClose}>
            {label}
          </a>
        ) : (
          <NavLink key={route} className={className} to={route} onClick={onClose}>
            {label}
          </NavLink>
        );
      })}
      <button
        type='button'
        ref={closeButtonRef}
        aria-label='Закрыть навигационное меню'
        className='side-menu__close-button'
        onClick={onClose}
      />
    </Dialog>
  );
}

export default SideMenu;
