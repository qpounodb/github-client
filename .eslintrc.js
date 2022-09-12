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
  },

  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
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
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
        ],
        // distinctGroup: true,
        'newlines-between': 'always-and-inside-groups',
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
