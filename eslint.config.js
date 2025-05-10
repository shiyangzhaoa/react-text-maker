import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {Record<string, boolean>} */
const globals = {
  browser: true,
  es2021: true,
  node: true
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'import': importPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals
    },
    rules: {
      'semi': ['error', 'always'],
      '@typescript-eslint/semi': ['error', 'always'],
      'semi-style': ['error', 'last'],
      'no-extra-semi': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': ['error', {
        'additionalHooks': '(useCompareMemo|useEvent)'
      }],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          'warnOnUnassignedImports': true,
          'distinctGroup': false,
          'pathGroupsExcludedImportTypes': [],
          'alphabetize': { 'order': 'asc' }
        }
      ],
      'no-console': ['warn', { 'allow': ['warn', 'error'] }]
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: true
      }
    }
  }
];
