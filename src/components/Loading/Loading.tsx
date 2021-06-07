import React from 'react';
import ReactDOM from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import './style.scss';

const Loading: React.FC = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <RemoveScroll removeScrollBar children={null} className='loading' />,
    rootElement
  );
};

export default Loading;
