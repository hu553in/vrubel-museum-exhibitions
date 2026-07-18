import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const reactRecommended = reactPlugin.configs.flat['recommended'];
const reactJsxRuntime = reactPlugin.configs.flat['jsx-runtime'];

if (!reactRecommended || !reactJsxRuntime) {
  throw new Error('eslint-plugin-react flat configs are unavailable');
}

export default defineConfig(
  globalIgnores(['**/build/**']),
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'no-alert': 'error',
      'no-console': ['error', { allow: ['error'] }],
      'prefer-const': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'no-alert': 'error',
      'no-console': ['error', { allow: ['error'] }],
      'prefer-const': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx,mts,cts}'],
    extends: [vitest.configs.recommended, testingLibrary.configs['flat/react']],
    rules: {
      'testing-library/no-node-access': 'off',
    },
  },
  {
    files: ['*.config.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    extends: [
      jsxA11yPlugin.flatConfigs.strict,
      reactRecommended,
      reactJsxRuntime,
      reactHooksPlugin.configs.flat['recommended-latest'],
      reactRefreshPlugin.configs.vite,
    ],
    rules: {
      'jsx-a11y/media-has-caption': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
    },
    settings: {
      react: {
        version: '19',
      },
    },
  },
  eslintConfigPrettier
);
