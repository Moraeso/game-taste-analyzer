const filter = require('lodash/filter');
const includes = require('lodash/includes');
const babelWeb = require('./babelWeb');
const excludeFromWeb = [
  // '@loadable/babel-plugin',
  'lodash',
];
module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  const webConfig = babelWeb(api, 'server');
  return {
    ...webConfig,
    plugins: [
      ...(filter(webConfig.plugins, (v) => !includes(excludeFromWeb, v))),
    ],
  };
};
