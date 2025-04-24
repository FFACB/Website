import authKit from './conf/auth/auth.config.js';
import parametresKit from './conf/parametres/parametres.config.js';
import assetsKit from './conf/assets/asset.config.js';
import googleapisKit from './conf/googleapis/googleapis.config.js';

const kits = [authKit(), parametresKit(), assetsKit(), googleapisKit()];

for (const kit of kits) {
	kit.buildStart();
}
