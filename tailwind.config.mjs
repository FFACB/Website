import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import scrollbar from 'tailwind-scrollbar';
import { limeTheme } from './themes/back/lime';
import path from 'path';

let skeletonPath = path.join(
	path.dirname(require.resolve('@skeletonlabs/skeleton')),
	'../**/*.{html,js,svelte,ts}'
);

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		skeletonPath
	],

	theme: {
		extend: {}
	},

	plugins: [
		forms,
		scrollbar,
		skeleton({
			themes: {
				custom: [
					// backoffice
					limeTheme
				]
			}
		})
	]
};
