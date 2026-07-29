import { lazy, type ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import Loading from '@/components/common/Loading/Loading';
import { ROUTES } from '@/constants';
import HeaderFooterLayout from '@/layouts/revived-paintings/HeaderFooter/HeaderFooterLayout';

const Intro = lazy(async () => import('@/pages/revived-paintings/Intro/Intro'));
const Galos = lazy(async () => import('@/pages/revived-paintings/Galos/Galos'));
const About = lazy(async () => import('@/pages/revived-paintings/About/About'));
const Catalogue = lazy(async () => import('@/pages/revived-paintings/Catalogue/Catalogue'));
const Picture = lazy(async () => import('@/pages/revived-paintings/Picture/Picture'));
const Contacts = lazy(async () => import('@/pages/revived-paintings/Contacts/Contacts'));
const Account = lazy(async () => import('@/pages/revived-paintings/Account/Account'));

function withSuspense(children: ReactNode) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function RevivedPaintings() {
  return (
    <Routes>
      <Route index element={withSuspense(<Intro />)} />
      <Route path={ROUTES.GALOS.slice(1)} element={withSuspense(<Galos />)} />
      <Route
        path={ROUTES.ABOUT.slice(1)}
        element={<HeaderFooterLayout>{withSuspense(<About />)}</HeaderFooterLayout>}
      />
      <Route
        path={ROUTES.CATALOGUE.slice(1)}
        element={<HeaderFooterLayout>{withSuspense(<Catalogue />)}</HeaderFooterLayout>}
      />
      <Route path={`${ROUTES.PICTURE.slice(1)}/:id`} element={withSuspense(<Picture />)} />
      <Route
        path={ROUTES.CONTACTS.slice(1)}
        element={<HeaderFooterLayout>{withSuspense(<Contacts />)}</HeaderFooterLayout>}
      />
      <Route
        path={ROUTES.ACCOUNT.slice(1)}
        element={<HeaderFooterLayout>{withSuspense(<Account />)}</HeaderFooterLayout>}
      />
      <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
    </Routes>
  );
}

export default RevivedPaintings;
