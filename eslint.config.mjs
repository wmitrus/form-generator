import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
// import html from 'eslint-plugin-html';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
  react: pluginReact.configs.flat.recommended,
});

const patchedConfig = fixupConfigRules([...compat.extends('next/core-web-vitals')]);

const config = [
  ...patchedConfig,
  ...tseslint.configs.recommended,
  prettierConfigRecommended,
  // {
  //   files: ['**/*.hbs'],
  //   plugins: { html },
  //   settings: {
  //     'html/html-extensions': ['.hbs', '.we'], // consider .html and .we files as HTML
  //   },
  // },
  // Add more flat configs here
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  { ignores: ['**/node_modules/*', '**/out/*', '**/.next/*', 'plop-templates/**/*.*'] },
  {
    rules: {
      'react/no-unescaped-entities': 'error',
    },
  },
];

export default config;
