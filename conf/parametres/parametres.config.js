// initScriptPlugin.ts
import { lucia } from 'lucia';
import * as adapter from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';
import { initialize } from './parametres.js'


export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize()
		}
	};
};
