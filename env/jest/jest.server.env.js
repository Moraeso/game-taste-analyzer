// my-custom-environment
const NodeEnvironment = require('jest-environment-node');

const path = require('path');

require('@babel/register')({
  configFile: path.resolve('./env/babel/babelServer.js'),
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  cache: true,
});
require('core-js/stable');
require('regenerator-runtime/runtime');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    // eslint-disable-next-line global-require
    // this.global.REQUEST = require('./superTestRequest');
  }

  runScript(script) {
    return super.runScript(script);
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = CustomEnvironment;
