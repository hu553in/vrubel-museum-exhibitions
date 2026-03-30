import './style.scss';

import type { ReactNode } from 'react';

import Footer from '@/components/revived-paintings/Footer/Footer';
import Header from '@/components/revived-paintings/Header/Header';

interface Props {
  children?: ReactNode;
}

function HeaderFooterLayout({ children }: Props) {
  return (
    <div className='header-footer-layout'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HeaderFooterLayout;
