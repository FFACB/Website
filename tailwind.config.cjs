
import forms from '@tailwindcss/forms';
const { skeleton } = require('@skeletonlabs/tw-plugin');
import { backoffice } from './themes/back/custom'
import { limeTheme } from './themes/back/lime';

/** @type {import('tailwindcss').Config} */
module.exports = {

	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		),
	],

	theme: {
	
		extend: {},
	},
	
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [
					// backoffice
					limeTheme
				]
			}
		}),
	]
}