import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// @ts-ignore
import { soundManager } from 'soundmanager2';
import RevivedPaintings from './components/revived-paintings/RevivedPaintings/RevivedPaintings';
import { ROUTES } from './constants';
import Main from './pages/main/Main/Main';
import './style.scss';

soundManager.setup({ debugMode: false });

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.DEFAULT} element={<Main />} />
      <Route path={`${ROUTES.REVIVED_PAINTINGS}/*`} element={<RevivedPaintings />} />
      <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
    </Routes>
  </BrowserRouter>
);
