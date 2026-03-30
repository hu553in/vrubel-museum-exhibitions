import 'normalize.css';
import './style.scss';

import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';
import getAppRootElement from '@/utils/getAppRootElement';

const Main = lazy(async () => import('@/pages/main/Main/Main'));
const RevivedPaintings = lazy(
  async () => import('@/components/revived-paintings/RevivedPaintings/RevivedPaintings')
);

const rootElement = getAppRootElement();

if (!rootElement) {
  throw new Error('Root element was not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={ROUTES.DEFAULT} element={<Main />} />
          <Route path={`${ROUTES.REVIVED_PAINTINGS}/*`} element={<RevivedPaintings />} />
          <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
