const webpackConfigPath = process.env.PLATFORM === 'web' ? './env/webpack/webpack.web.dev' : './env/webpack/webpack.server.dev';
const config = require(webpackConfigPath);

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};

module.exports = config;
