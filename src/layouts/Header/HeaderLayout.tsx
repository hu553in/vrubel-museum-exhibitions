import React from 'react';
import Header from '../../components/Header/Header';
import './style.scss';

interface Props {
  children?: React.ReactNode;
}

const HeaderLayout: React.FC<Props> = props => {
  const { children } = props;

  return (
    <div className='header-layout'>
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
