import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default tseslint.config(
	{
		ignores: [
			'**/node_modules',
			'**/.next/**/*',
			'**/_next/**/*',
			'**/dist/**/*',
			'**/public/',
			'**/package.json',
			'**/package-lock.json',
			'**/next.config.js',
			'**/webpack.config.js',
			'**/storybook-static/**/*',
		],
	},
	...tseslint.configs.recommended,
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'next',
			'next/core-web-vitals',
			'prettier',
		),
	),
	{
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
		},
	},
	{
		plugins: {
			'unused-imports': fixupPluginRules(unusedImports),
		},
		rules: {
			'object-shorthand': 'error',
			'unused-imports/no-unused-imports': 'warn',
			'react/jsx-curly-brace-presence': 'error',
			'import/no-anonymous-default-export': 'off',

			'react/self-closing-comp': [
				'error',
				{
					component: true,
					html: false,
				},
			],

			'require-jsdoc': 0,
			'valid-jsdoc': ['off'],

			'import/order': [
				'warn',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],

					'newlines-between': 'always',
					pathGroupsExcludedImportTypes: ['internal'],

					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},

					pathGroups: [
						{
							pattern: '@/**',
							group: 'external',
							position: 'after',
						},
					],
				},
			],
		},
	},
);
