import cn from 'classnames';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
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
  parentElement: HTMLElement;
  links: Link[];
}

const SideMenu: React.FC<Props> = props => {
  const { open, onClose, links, parentElement } = props;
  const location = useLocation();

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

  return ReactDOM.createPortal(
    <>
      <RemoveScroll enabled={open} removeScrollBar>
        <aside className={classNameToUse}>
          {linkElements}
          <button
            aria-label='Закрыть меню'
            className='side-menu__close-button'
            onClick={onClose}
          />
        </aside>
      </RemoveScroll>
      {open && <div className='side-menu-overlay' onClick={onClose} />}
    </>,
    parentElement
  );
};

export default SideMenu;
