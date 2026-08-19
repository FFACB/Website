import { initialize } from './partenaires.js';

export default () => {
	return {
		name: 'partenaires-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
