import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// gsap publie des fichiers .js en syntaxe ESM sans "type": "module" :
		// externalisé, Node les charge en CJS et échoue. On le fait donc traiter par Vite.
		noExternal: ['gsap']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	server: {
		hmr: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()) + '/uploads']
		}
	}
});
