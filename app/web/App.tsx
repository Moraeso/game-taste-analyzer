import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'web/store/modules';
import { createGlobalStyle } from 'styled-components';
import MainContainer from 'web/pageContainers/MainContainer';
import CounterContainer from 'web/components/Counter/CounterContainer';

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
    <MainContainer />
    {/* <CounterContainer /> */}
    {/* <ServerCheckComponent /> */}
  </Provider>
);

export default App;
