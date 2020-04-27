const composer = require('./composer');
const common = require('./webpack.common');
const commonProd = require('./webpack.common.prod');
const server = require('./webpack.server.common');


module.exports = composer(common, commonProd, server, {
  output: {
    filename: 'prodServer.js',
  },
  devtool: 'cheap-module-source-map',
});
