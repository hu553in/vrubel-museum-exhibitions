import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import HeaderLayout from './layouts/Header/HeaderLayout';
import HeaderFooterLayout from './layouts/HeaderFooter/HeaderFooterLayout';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import MainPage from './pages/Main/Main';
import './style.scss';

const emptyPageStub = (
  <img
    style={{
      width: '80%',
      maxWidth: '640px',
    }}
    src='https://www.placecage.com/gif/640/480'
    alt='Заглушка для пустой страницы'
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.DEFAULT}>
        <MainPage />
      </Route>
      <Route path={ROUTES.ABOUT}>
        <HeaderFooterLayout>
          <About />
        </HeaderFooterLayout>
      </Route>
      <Route path={ROUTES.CATALOGUE}>
        <HeaderLayout>{emptyPageStub}</HeaderLayout>
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
