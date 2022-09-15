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
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:mobx/recommended',
    'prettier',
  ],

  plugins: [
    'import',
    'react',
    'react-hooks',
    'mobx',
    '@typescript-eslint',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
  },

  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.eslint.json',
      },
      node: true,
    },
  },

  rules: {
    'import/no-named-as-default-member': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '~*',
            group: 'internal',
          },
          {
            pattern: '~/**',
            group: 'internal',
          },
          {
            pattern: '~*/**',
            group: 'internal',
          },
        ],
        // distinctGroup: true,
        // 'newlines-between': 'always-and-inside-groups',
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
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
      rules: {
        'testing-library/no-node-access': [
          'error',
          { allowContainerFirstChild: true },
        ],
      },
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
