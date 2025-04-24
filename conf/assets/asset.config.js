import { initialize } from './asset.js';

export default () => {
	return {
		name: 'assets-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
