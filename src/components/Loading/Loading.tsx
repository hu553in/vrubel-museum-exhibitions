import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const Loading: React.FC = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    return null;
  }

  return ReactDOM.createPortal(<div className='loading' />, rootElement);
};

export default Loading;
