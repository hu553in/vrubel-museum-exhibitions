import getAppRootElement from '@/utils/getAppRootElement';
import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
}

const Portal: React.FC<Props> = ({ children, container }) => {
  const target = container ?? getAppRootElement();

  if (!target) {
    return null;
  }

  return createPortal(children, target);
};

export default Portal;
