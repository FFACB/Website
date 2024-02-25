import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

import authKit from './conf/auth/auth.config';
import parametresKit from './conf/parametres/parametres.config';

export default defineConfig({
	plugins: [sveltekit(), authKit(), parametresKit()],

	server: {
		hmr: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()) + '/uploads']
		}
	}
});
