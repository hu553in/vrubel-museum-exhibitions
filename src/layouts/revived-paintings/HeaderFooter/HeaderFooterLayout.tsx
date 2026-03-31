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
      <a className='srOnly' href='#main-content'>
        Перейти к основному содержимому
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HeaderFooterLayout;
