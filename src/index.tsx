import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// @ts-ignore
import { soundManager } from 'soundmanager2';
import RevivedPaintings from './components/revived-paintings/RevivedPaintings/RevivedPaintings';
import { ROUTES } from './constants';
import Main from './pages/main/Main/Main';
import './style.scss';

soundManager.setup({ debugMode: false });

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.DEFAULT}>
        <Main />
      </Route>
      <Route path={ROUTES.REVIVED_PAINTINGS}>
        <RevivedPaintings />
      </Route>
      <Route>
        <Redirect to={ROUTES.DEFAULT} />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
