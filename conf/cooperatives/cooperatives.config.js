// initScriptPlugin.ts
import { initialize } from './cooperatives.js';

export default () => {
    return {
        name: 'cooperatives-init-script',
        async buildStart() {
            await initialize();
        }
    };
};
