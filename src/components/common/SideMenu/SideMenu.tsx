import Dialog from '@/components/common/Dialog/Dialog';
import cn from 'classnames';
import React, { useId, useMemo, useRef } from 'react';
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

const SideMenu: React.FC<Props> = props => {
  const { open, onClose, links } = props;
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  const linkElements = useMemo(
    () =>
      links.map((link, index) => {
        const { label, route, external = false } = link;

        const props = {
          key: `link-${index}`,
          className: cn('side-menu__link', {
            'side-menu__link_active': route === location.pathname,
          }),
          onClick: onClose,
        };

        return external ? (
          <a {...props} href={route}>
            {label}
          </a>
        ) : (
          <NavLink {...props} to={route}>
            {label}
          </NavLink>
        );
      }),
    [links, location.pathname, onClose]
  );

  const classNameToUse = useMemo(
    () =>
      cn('side-menu', {
        'side-menu_open': open,
      }),
    [open]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      panelClassName={classNameToUse}
      overlayClassName='side-menu-overlay'
      labelledBy={titleId}
      initialFocusRef={closeButtonRef}
    >
      <h2 className='side-menu__title' id={titleId}>
        Навигационное меню
      </h2>
      {linkElements}
      <button
        type='button'
        ref={closeButtonRef}
        aria-label='Закрыть навигационное меню'
        className='side-menu__close-button'
        onClick={onClose}
      />
    </Dialog>
  );
};

export default SideMenu;
