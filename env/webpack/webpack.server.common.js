const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { ComposeOptions, Override } = require('./composer');


module.exports = {
  entry: [
    path.join(process.cwd(), 'app/server/index.js'),
  ],
  plugins: [
    new ComposeOptions({
      babelPath: 'env/babel/babelServer',
      isServer: true,
    }),
  ],
  output: {
    path: path.resolve(process.cwd(), `build/server`),
  },
  resolve: {
    extensions: new Override([
      '.prod.tsx',
      '.prod.ts',
      '.prod.js',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ]),
  },
  externals: [
    nodeExternals(
      {
        modulesFromFile: {
          include: ['dependencies'],
        },
      },
    ),
  ],
  optimization: {
    minimize: false, // <---- disables uglify.
  },
  target: 'node',
};
