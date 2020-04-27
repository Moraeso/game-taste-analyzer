const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { ComposeOptions } = require('./composer');

module.exports = {
  plugins: [
    new ComposeOptions({
      isProduction: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  performance: {
    hints: 'warning',
  },
  mode: 'production',
  stats: 'minimal',
};
