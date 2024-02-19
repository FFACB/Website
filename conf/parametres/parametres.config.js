// initScriptPlugin.ts
import * as adapter from '@lucia-auth/adapter-prisma';
import { initialize } from './parametres.js'


export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			await initialize()
		}
	};
};
