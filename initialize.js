import authKit from './conf/auth/auth.config.js';
import parametresKit from './conf/parametres/parametres.config.js';
import assetsKit from './conf/assets/asset.config.js';
import googleapisKit from './conf/googleapis/googleapis.config.js';
import cooperativesKit from './conf/cooperatives/cooperatives.config.js';
import partenairesKit from './conf/partenaires/partenaires.config.js';

const kits = [
	authKit(),
	parametresKit(),
	assetsKit(),
	googleapisKit(),
	cooperativesKit(),
	partenairesKit()
];

for (const kit of kits) {
	kit.buildStart();
}
