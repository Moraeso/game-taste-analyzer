import React from 'react';
import ServerCheckComponent from 'web/components/ServerCheckComponent';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'web/store/modules';
import CounterContainer from 'web/container/CounterContainer';

const store = createStore(rootReducer);
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <CounterContainer />
    <ServerCheckComponent />
  </Provider>
);

export default App;
