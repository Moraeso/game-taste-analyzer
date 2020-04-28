const path = require('path');
module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'airbnb',
    'plugin:jest/recommended',
  ],
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
    'es6': true,
  },
  'globals': {
    'amplitude': 'readonly',
    'page': true,
    'browser': true,
    'context': true,
    'jestPuppeteer': true,
    '__EXPERIMENTAL__': true,
  },
  'plugins': [
    'import',
    'react',
    'jsx-a11y',
    'react-hooks',
    // https://github.com/jfmengels/eslint-plugin-fp
    'fp',
    'jest',
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
    babelOptions: {
      configFile: path.resolve(__dirname, './env/babel/babelWeb.js'),
    },
  },
  'rules': {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'lodash-fp/use-fp': 'off',
    'lodash-fp/no-unused-result': 'off',
    'lodash-fp/no-extraneous-args': 'off',
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'arrow-body-style': [
      2,
      'as-needed',
    ],
    'class-methods-use-this': 0,
    'comma-dangle': [
      2,
      'always-multiline',
    ],
    'func-names': [1, 'as-needed', { 'generators': 'as-needed' }],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': [2, { caseSensitive: true }],
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'indent': 2,
    'react/no-multi-comp': 0,
    'function-paren-newline': 1,
    'object-curly-newline': 0,
    'prefer-destructuring': 1,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [
      2,
      'multiline',
    ],
    'fp/no-proxy': 'error',
    'padded-blocks': 1,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'require-yield': 0,
    'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'max-params': ['warn', 4],
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': path.resolve(__dirname, './env/webpack/webpack.web.dev.js'),
      },
      node: {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'react': {
      'pragma': 'React',
      'version': '16.6',
    },
  },
  'overrides': [
    {
      'files': ['*.ts', '*.tsx'],
      'parser': '@typescript-eslint/parser',
      'plugins': [
        '@typescript-eslint',
      ],
      'rules': {
        'space-before-function-paren': 'off',
        'no-useless-constructor': 'off',
        'global-require': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'lines-between-class-members': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-types': 'error',
        'camelcase': 'off',
        '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'off', {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        'indent': 'off',
        '@typescript-eslint/indent': [
          'error', 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
              parameters: 1,
              body: 1,
            },
            FunctionExpression: {
              parameters: 1,
              body: 1,
            },
            CallExpression: {
              arguments: 1,
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            ignoreComments: false,
          },
        ],
        '@typescript-eslint/interface-name-prefix': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
      'settings': {
        'import/extensions': [
          '.ts', '.tsx', '.js', '.jsx',
        ],
        'import/resolver': {
          'webpack': {
            'config': path.resolve(__dirname, './env/webpack/webpack.web.dev.js'),
          },
          node: {
            'extensions': ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        'react': {
          'pragma': 'React',
          'version': '16.6',
        },
      },
    },

  ],
};


