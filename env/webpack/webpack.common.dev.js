const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const { ComposeOptions } = require('./composer');

module.exports = {
  devtool: 'inline-source-map',
  performance: {
    hints: false,
  },
  plugins: [
    new ComposeOptions({
      isProduction: false,
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'development',
  cache: true,
};
