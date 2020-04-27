// https://www.npmjs.com/package/babel-plugin-module-resolver
/*
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": ["app/*"],
    }
  }
}
* */


module.exports = () => ({
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    // https://babeljs.io/docs/en/babel-plugin-proposal-decorators#references
    [
      '@babel/plugin-proposal-decorators',
      {
        decoratorsBeforeExport: false,
      },
    ],
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/proposal-object-rest-spread',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11',
        },
        corejs: '3',
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-typescript',
  ],
});
