const nodeExternals = require('webpack-node-externals');
const composer = require('./composer');
const common = require('./webpack.common');
const commonDev = require('./webpack.common.dev');
const server = require('./webpack.server.common');

module.exports = composer(common, commonDev, server, {
  output: {
    filename: 'devServer.js',
  },
  externals: [
    nodeExternals({
      include: ['dependencies'],
    }),
  ],
});
