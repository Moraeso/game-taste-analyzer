import React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'web/App';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<App name="name" />, MOUNT_NODE);

require('offline-plugin/runtime').install();
