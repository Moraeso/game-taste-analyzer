const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const composer = require('./composer');
const common = require('./webpack.common');
const commonDev = require('./webpack.common.dev');
const web = require('./webpack.web.common');
const analyzer = require('./webpack.analyzer');


module.exports = composer(common, commonDev, web, analyzer, {
  entry: {
    main: [
      'eventsource-polyfill', // Necessary for hot reloading with IE
      'webpack-hot-middleware/client?reload=true',
      path.join(process.cwd(), 'app/web/entry.js'), // Start with js/constants.js
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      template: 'app/web/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      showErrors: false,
    }),
    new OfflinePlugin({
      relativePaths: false,
      caches: {
        main: [':rest:'],
        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cachedString only when first loaded)
        additional: ['*.chunk.js'],
      },
      ServiceWorker: {
        publicPath: '/static/sw.js',
      },
      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
  ],

});
