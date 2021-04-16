import cn from 'classnames';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import './style.scss';

interface Link {
  label: string;
  dest: string;
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
        const { label, dest, external = false } = link;

        const props = {
          key: `link-${index}`,
          className: cn('side-menu__link', {
            'side-menu__link_active': dest === location.pathname,
          }),
          onClick: onClose,
        };

        return external ? (
          <a {...props} href={dest}>
            {label}
          </a>
        ) : (
          <NavLink {...props} to={dest}>
            {label}
          </NavLink>
        );
      }),
    [links, location.pathname, onClose]
  );

  const sideMenuClassName = useMemo(
    () =>
      cn('side-menu', {
        'side-menu_open': open,
      }),
    [open]
  );

  return ReactDOM.createPortal(
    <>
      <aside className={sideMenuClassName}>
        {linkElements}
        <button className='side-menu__close-button' onClick={onClose} />
      </aside>
      {open && <div className='side-menu-overlay' onClick={onClose} />}
    </>,
    parentElement
  );
};

export default SideMenu;
