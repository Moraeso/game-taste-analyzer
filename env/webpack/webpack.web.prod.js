const path = require('path');
const OfflinePlugin = require('offline-plugin');
// const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const composer = require('./composer');
const common = require('./webpack.common');
const commonProd = require('./webpack.common.prod');
const web = require('./webpack.web.common');


module.exports = composer(common, commonProd, web, {
  entry: {
    main: [
      path.join(process.cwd(), 'app/web/prodEntry.js'),
    ],
  }, // Start with js/constants.js
  output: {
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].chunk.js',
  },
  optimization: {
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true,
    moduleIds: 'natural',
    minimizer: [
      new TerserJSPlugin({
        parallel: true,

        terserOptions: {
          parse: {},
          compress: {
            drop_console: false,
            // arguments: true,
            // booleans_as_integers: true,
            // keep_fargs: false,
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin({}),
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Minify and optimize the index.html
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
      // favicon: 'app/web/assets/favicon.ico',
    }),
    // new StyleExtHtmlWebpackPlugin(),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      ServiceWorker: {
        publicPath: '/static/sw.js',
      },
      caches: {
        main: [':rest:'],
        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cachedString only when first loaded)
        additional: ['*.chunk.js'],
      },
      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
  ],
});
