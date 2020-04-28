import React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'web/App';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<App />, MOUNT_NODE);

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  const callback = () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    ReactDOM.render(<App />, MOUNT_NODE);
  };
  module.hot.accept([], callback);
}
require('offline-plugin/runtime').install();
