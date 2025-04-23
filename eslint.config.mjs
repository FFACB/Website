import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import parser from 'svelte-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export default tsEslint.config([
// 	{
// 		ignores: [
// 			'**/.DS_Store',
// 			'**/node_modules',
// 			'build-node',
// 			'.svelte-kit',
// 			'package',
// 			'**/.env',
// 			'**/.env.*',
// 			'!**/.env.example',
// 			'**/pnpm-lock.yaml',
// 			'**/package-lock.json',
// 			'**/yarn.lock',
// 			'tailwind.config.cjs',
// 			'postcss.config.cjs'
// 		]
// 	},
// 	...compat.extends(
// 		'eslint:recommended',
// 		'plugin:@typescript-eslint/recommended',
// 		'plugin:svelte/recommended',
// 		'prettier'
// 	),
// 	{
// 		plugins: {
// 			'@typescript-eslint': typescriptEslint
// 		},

// 		languageOptions: {
// 			globals: {
// 				...globals.browser,
// 				...globals.node
// 			},

// 			parser: tsParser,
// 			ecmaVersion: 2020,
// 			sourceType: 'module',

// 			parserOptions: {
// 				extraFileExtensions: ['.svelte']
// 			}
// 		}
// 	},
// 	{
// 		files: ['**/*.svelte'],

// 		languageOptions: {
// 			parser: parser,
// 			ecmaVersion: 5,
// 			sourceType: 'script',

// 			parserOptions: {
// 				parser: '@typescript-eslint/parser'
// 			}
// 		},

// 		rules: {
// 			'svelte/no-at-html-tags': 'off'
// 		}
// 	}
// ]);

export default tsEslint.config(
	js.configs.recommended,
	...tsEslint.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	eslintConfigPrettier,
	...eslintPluginSvelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parser: parser,
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},

		rules: {
			'svelte/no-at-html-tags': 'off'
		}
	},
	{
		ignores: [
			'**/.DS_Store',
			'**/node_modules',
			'build-node',
			'.svelte-kit',
			'package',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'**/pnpm-lock.yaml',
			'**/package-lock.json',
			'**/yarn.lock',
			'tailwind.config.cjs',
			'postcss.config.cjs'
		]
	}
);
