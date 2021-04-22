import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import HeaderFooterLayout from './layouts/HeaderFooter/HeaderFooterLayout';
import About from './pages/About/About';
import Catalogue from './pages/Catalogue/Catalogue';
import Contacts from './pages/Contacts/Contacts';
import Gallery from './pages/Gallery/Gallery';
import Main from './pages/Main/Main';
import Picture from './pages/Picture/Picture';
import './style.scss';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.DEFAULT}>
        <Main />
      </Route>
      <Route path={ROUTES.GALLERY}>
        <Gallery />
      </Route>
      <Route path={ROUTES.ABOUT}>
        <HeaderFooterLayout>
          <About />
        </HeaderFooterLayout>
      </Route>
      <Route path={ROUTES.CATALOGUE}>
        <HeaderFooterLayout>
          <Catalogue />
        </HeaderFooterLayout>
      </Route>
      <Route path={`${ROUTES.PICTURE}/:id`}>
        <Picture />
      </Route>
      <Route path={ROUTES.CONTACTS}>
        <HeaderFooterLayout>
          <Contacts />
        </HeaderFooterLayout>
      </Route>
      <Route>
        <Redirect to={ROUTES.DEFAULT} />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
