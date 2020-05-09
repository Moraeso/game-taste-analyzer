import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'web/store/modules';
import MainContainer from 'web/pageContainers/MainContainer';
import CounterContainer from 'web/components/Counter/CounterContainer';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <MainContainer />
    {/* <CounterContainer /> */}
    {/* <ServerCheckComponent /> */}
  </Provider>
);

export default App;
