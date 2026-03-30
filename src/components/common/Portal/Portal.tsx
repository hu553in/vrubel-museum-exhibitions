import getAppRootElement from '@/utils/getAppRootElement';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
}

function Portal({ children, container }: Props) {
  const target = container ?? getAppRootElement();

  if (!target) {
    return null;
  }

  return createPortal(children, target);
}

export default Portal;
