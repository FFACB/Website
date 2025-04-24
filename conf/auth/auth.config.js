import { initialize } from './auth.js';

export default () => {
	return {
		name: 'auth-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
