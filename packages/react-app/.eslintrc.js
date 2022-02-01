const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    radix: 0,
    indent: [
      0,
      0,
      {
        SwitchCase: 1,
      },
    ],
    'global-require': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'lines-between-class-members': 0,
    'no-buffer-constructor': 0,
    'getter-return': 0,
    'for-direction': 0,
    'no-console': 1,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    'prefer-promise-reject-errors': 0,
    'no-throw-literal': 0,
    'import/no-import-module-exports': 0,
    'func-names': 0,
    'default-param-last': 0,
  },
};