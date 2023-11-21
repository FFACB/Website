
import { sveltekit } from '@sveltejs/kit/vite';
import {defineConfig, searchForWorkspaceRoot } from 'vite';
import authkit from './auth.config'; 



export default defineConfig({
	plugins: [sveltekit(),authkit()],
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()) + '/uploads']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
