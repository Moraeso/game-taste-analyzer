const path = require('path');
const webpack = require('webpack');
const { ComposeOptions, Override } = require('./composer');

module.exports = {
  plugins: [
    new ComposeOptions({
      babelPath: 'env/babel/babelWeb',
      isServer: false,
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    extensions: new Override([
      '.browser.ts',
      '.browser.js',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ]),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(process.cwd(), `build/web`),
  },
  target: 'web',

};
