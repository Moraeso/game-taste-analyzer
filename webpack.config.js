const webpackConfigPath = process.env.PLATFORM === 'web' ? './env/webpack/webpack.web.dev' : './env/webpack/webpack.server.dev';
const config = require(webpackConfigPath);

module.exports = config;
