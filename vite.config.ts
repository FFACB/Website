import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vitest/config';
import {defineConfig, searchForWorkspaceRoot } from 'vite';


export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()) + '/uploads']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
