import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import MainPage from './pages/main/Main';
import './style.scss';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.DEFAULT}>
        <MainPage />
      </Route>
      <Route>
        <Redirect to={ROUTES.DEFAULT} />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
