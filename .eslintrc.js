//@ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:mobx/recommended',
    'prettier',
  ],

  plugins: ['react', 'react-hooks', 'mobx', '@typescript-eslint', 'prettier'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },

  rules: {
    // 'sort-imports': 'error',
    'mobx/exhaustive-make-observable': 'off',
    'mobx/missing-observer': 'off',
  },

  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    {
      files: ['**/*.test.*'],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};

module.exports = config;
