/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const { Customizer } = require('./composer');


const moduleNeedsCompile = [];
module.exports = {
  output: {
    publicPath: `/static`,
  },
  module: {
    rules: [
      {
        test: /(?!(android|ios))\.(js|ts|tsx)$/, // Transform all .js files required somewhere with Babel
        exclude: (content) => /node_modules/.test(content) && moduleNeedsCompile.map((t) => content.indexOf(t) < 0).filter((t) => t).length === moduleNeedsCompile.length,
        use: new Customizer((composeOption) => [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              configFile: path.resolve(composeOption.babelPath),
            },
          },
        ]),
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: new Customizer(({ isServer }) => [
          {
            loader: 'file-loader',
            options: {
              emitFile: !isServer,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          },
        ]),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.md/,
        use: [
          'raw-loader',
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Always expose NODE_ENV to webpack, in order to use `p{ path: `./env/${bill.env.ENV || 'local'}.env` }rocess.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
  ],
  resolve: {
    // https://github.com/moment/moment/issues/2979
    alias: {
      moment$: 'moment/moment.js',
      'continuation-local-storage': 'cls-hooked',
    },
    modules: ['app', 'node_modules'],
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  parallelism: 15,
  cache: true,
};
