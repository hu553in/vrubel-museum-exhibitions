import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/constants';
import HeaderFooterLayout from '@/layouts/revived-paintings/HeaderFooter/HeaderFooterLayout';
import About from '@/pages/revived-paintings/About/About';
import Account from '@/pages/revived-paintings/Account/Account';
import Catalogue from '@/pages/revived-paintings/Catalogue/Catalogue';
import Contacts from '@/pages/revived-paintings/Contacts/Contacts';
import Galos from '@/pages/revived-paintings/Galos/Galos';
import Intro from '@/pages/revived-paintings/Intro/Intro';
import Picture from '@/pages/revived-paintings/Picture/Picture';

function RevivedPaintings() {
  return (
    <Routes>
      <Route index element={<Intro />} />
      <Route path={ROUTES.GALOS.slice(1)} element={<Galos />} />
      <Route
        path={ROUTES.ABOUT.slice(1)}
        element={
          <HeaderFooterLayout>
            <About />
          </HeaderFooterLayout>
        }
      />
      <Route
        path={ROUTES.CATALOGUE.slice(1)}
        element={
          <HeaderFooterLayout>
            <Catalogue />
          </HeaderFooterLayout>
        }
      />
      <Route path={`${ROUTES.PICTURE.slice(1)}/:id`} element={<Picture />} />
      <Route
        path={ROUTES.CONTACTS.slice(1)}
        element={
          <HeaderFooterLayout>
            <Contacts />
          </HeaderFooterLayout>
        }
      />
      <Route
        path={ROUTES.ACCOUNT.slice(1)}
        element={
          <HeaderFooterLayout>
            <Account />
          </HeaderFooterLayout>
        }
      />
      <Route path='*' element={<Navigate to={ROUTES.DEFAULT} replace />} />
    </Routes>
  );
}

export default RevivedPaintings;
