// initScriptPlugin.ts
import { initialize } from './parametres.js';

export default () => {
	return {
		name: 'parametres-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
