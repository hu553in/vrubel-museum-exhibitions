import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';

const Main = lazy(async () => import('@/pages/main/Main/Main'));
const RevivedPaintings = lazy(
  async () => import('@/components/revived-paintings/RevivedPaintings/RevivedPaintings')
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.DEFAULT} element={<Main />} />
        <Route path={`${ROUTES.REVIVED_PAINTINGS}/*`} element={<RevivedPaintings />} />
        <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
