import cn from 'classnames';
import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Dialog from '@/components/common/Dialog/Dialog';
import useDialogAccessibility from '@/hooks/useDialogAccessibility';
import { getSideMenuLinkKey, isSideMenuLinkActive } from '@/utils/sideMenuLinks';

import styles from './style.module.css';

interface Link {
  label: string;
  route: string;
  external?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  links: readonly Link[];
}

function SideMenu(props: Props) {
  const { open, onClose, links } = props;
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const { labelledBy: titleId } = useDialogAccessibility();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      panelClassName={cn(styles['sideMenu'], open ? styles['open'] : null)}
      overlayClassName={styles['overlay'] ?? ''}
      labelledBy={titleId}
      initialFocusRef={closeButtonRef}
    >
      <h2 className='srOnly' id={titleId}>
        Навигационное меню
      </h2>
      {links.map(link => {
        const { label, route, external = false } = link;
        const className = cn(
          styles['link'],
          isSideMenuLinkActive(route, location.pathname, external) ? styles['active'] : null
        );

        return external ? (
          <a key={getSideMenuLinkKey(link)} className={className} href={route} onClick={onClose}>
            {label}
          </a>
        ) : (
          <NavLink
            key={getSideMenuLinkKey(link)}
            className={className}
            to={route}
            onClick={onClose}
          >
            {label}
          </NavLink>
        );
      })}
      <button
        type='button'
        ref={closeButtonRef}
        aria-label='Закрыть навигационное меню'
        className={styles['closeButton']}
        onClick={onClose}
      />
    </Dialog>
  );
}

export default SideMenu;
