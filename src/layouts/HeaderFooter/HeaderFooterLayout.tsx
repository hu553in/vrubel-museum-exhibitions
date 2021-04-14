import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './style.scss';

interface Props {
  children?: React.ReactNode;
}

const HeaderFooterLayout: React.FC<Props> = props => {
  const { children } = props;

  return (
    <div className='header-footer-layout'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HeaderFooterLayout;
