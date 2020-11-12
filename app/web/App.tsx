import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'web/store/modules';
import { createGlobalStyle } from 'styled-components';
import ROUTER from 'web/ROUTER';
import GameInfoContainer from 'web/pageContainers/GameInfoContainer';
import GamesContainer from 'web/pageContainers/GamesContainer';
import NotFound from 'web/pageContainers/NotFound';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path={ROUTER.GAME} component={GameInfoContainer} />
        <Route path={ROUTER.GAMES} component={GamesContainer} />
        <Route path={ROUTER.NOT_FOUND} component={NotFound} />
        <Redirect path="*" to={ROUTER.NOT_FOUND} />
      </Switch>
    </BrowserRouter>
    {/* <CounterContainer /> */}
    {/* <ServerCheckComponent /> */}
  </Provider>
);

export default App;
