const babelCommon = require('./babelCommon');

module.exports = (api, type = 'web') => {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  const babelShared = babelCommon(api, type);
  return {
    plugins: [
      ...babelShared.plugins,
    ],
    presets: [
      ...babelShared.presets,
      '@babel/preset-react',
    ],
    env: {
      production: {
        plugins: [
          'transform-react-remove-prop-types',
          '@babel/plugin-transform-react-inline-elements',
          '@babel/plugin-transform-react-constant-elements',
        ],
      },
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: true,
            },
          ],
          'dynamic-import-node',
        ],
      },
    },
  };
};
