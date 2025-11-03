import authKit from './conf/auth/auth.config.js';
import parametresKit from './conf/parametres/parametres.config.js';
import assetsKit from './conf/assets/asset.config.js';
import googleapisKit from './conf/googleapis/googleapis.config.js';
import cooperativesKit from './conf/cooperatives/cooperatives.config.js';

const kits = [authKit(), parametresKit(), assetsKit(), googleapisKit(), cooperativesKit()];

for (const kit of kits) {
	kit.buildStart();
}
