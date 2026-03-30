import type { ReactNode } from 'react';

import Footer from '@/components/revived-paintings/Footer/Footer';
import Header from '@/components/revived-paintings/Header/Header';

import styles from './style.module.css';

interface Props {
  children?: ReactNode;
}

function HeaderFooterLayout({ children }: Props) {
  return (
    <div className={styles['headerFooterLayout']}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HeaderFooterLayout;
