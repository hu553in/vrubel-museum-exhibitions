import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import HeaderFooterLayout from '../../../layouts/revived-paintings/HeaderFooter/HeaderFooterLayout';
import About from '../../../pages/revived-paintings/About/About';
import Catalogue from '../../../pages/revived-paintings/Catalogue/Catalogue';
import Contacts from '../../../pages/revived-paintings/Contacts/Contacts';
import Galos from '../../../pages/revived-paintings/Galos/Galos';
import Intro from '../../../pages/revived-paintings/Intro/Intro';
import Picture from '../../../pages/revived-paintings/Picture/Picture';

const RevivedPaintings: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Intro />
      </Route>
      <Route path={`${path}${ROUTES.GALOS}`}>
        <Galos />
      </Route>
      <Route path={`${path}${ROUTES.ABOUT}`}>
        <HeaderFooterLayout>
          <About />
        </HeaderFooterLayout>
      </Route>
      <Route path={`${path}${ROUTES.CATALOGUE}`}>
        <HeaderFooterLayout>
          <Catalogue />
        </HeaderFooterLayout>
      </Route>
      <Route path={`${path}${ROUTES.PICTURE}/:id`}>
        <Picture />
      </Route>
      <Route path={`${path}${ROUTES.CONTACTS}`}>
        <HeaderFooterLayout>
          <Contacts />
        </HeaderFooterLayout>
      </Route>
      <Route path={`${path}${ROUTES.ACCOUNT}`}>
        <Redirect to={ROUTES.DEFAULT} />
      </Route>
      <Route>
        <Redirect to={ROUTES.DEFAULT} />
      </Route>
    </Switch>
  );
};

export default RevivedPaintings;
