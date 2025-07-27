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
		extend: {
			colors: {
				white: '#ffffff',
				dark: '#0d1c30',
				blue: '#007bc3',
				lightgrey: '#dceffc',
				grey: '#4d5f7b',
				red: '#e65247'
			},
			fontFamily: {
				'Funnel Sans': ['Funnel Sans', 'Funnel Sans Italic']
			},
			fontSize: {
				15: '15px',
				18: '18px',
				35: '35px',
				45: '45px'
			},
			lineHeight: {
				18: '18px',
				19: '19px',
				23: '23px',
				40: '40px',
				44: '44px'
			},
			letterSpacing: {
				0: '0px'
			}
		}
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
