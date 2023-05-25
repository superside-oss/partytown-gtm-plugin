module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  globals: {
    JSX: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['plugin:jest-dom/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['@typescript-eslint/eslint-plugin', 'jest-dom', 'testing-library', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    'newline-after-var': ['error', 'always'],
    'newline-before-return': ['error'],
    'react/jsx-curly-brace-presence': ['off'],
    'react/jsx-handler-names': ['off'],

    // Replace eslint rule with typescript one
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

    // Use TypeScript semi instead of eslint's built-in one
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],

    // Allow use before definition (used extensively by various styled-components)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],

    // Allow legacy const foo = require('bar') syntax
    '@typescript-eslint/no-var-requires': ['off'],

    // Sort imports
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin']
      }
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    curly: ['warn', 'all']
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-node-access': 'warn',
        'testing-library/no-render-in-setup': 'warn',
        'testing-library/no-unnecessary-act': 'warn'
      }
    }
  ],
  ignorePatterns: ['**/node_modules/', 'apps/*/static/**/*', '**/coverage/**/*']
};
