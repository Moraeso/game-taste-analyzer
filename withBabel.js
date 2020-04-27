require('source-map-support').install();
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const home = process.cwd();
require('@babel/register')({
  configFile: path.resolve(path.join(home, argv.babelConfig || './env/babel/babelServer.js')),
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  cache: true,
});
require('core-js/stable');
require('regenerator-runtime/runtime');
require(argv.entry);
