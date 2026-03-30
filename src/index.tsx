import RevivedPaintings from '@/components/revived-paintings/RevivedPaintings/RevivedPaintings';
import { ROUTES } from '@/constants';
import Main from '@/pages/main/Main/Main';
import getAppRootElement from '@/utils/getAppRootElement';
import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './style.scss';

const rootElement = getAppRootElement();

if (!rootElement) {
  throw new Error('Root element was not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.DEFAULT} element={<Main />} />
        <Route path={`${ROUTES.REVIVED_PAINTINGS}/*`} element={<RevivedPaintings />} />
        <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
