import type { Asset } from "@prisma/client";


const assetsType = {
	DEFAULT: 'DEFAULT',
	PICTURE: 'PICTURE',
	VIDEO: 'VIDEO',
	FILE: 'FILE'

}

const actions = {
	DEFAULT: 'DEFAULT',
	PICKED: 'PICKED',
	DELETE: 'DELETE',
	
};

export { actions, assetsType };

export type AssetPickerAction = {
	open: boolean;
	assetType: string;
	assetPickerId: string;
};

export type AssetAction = {
	actionName: string;
	assetType: string;
	asset: Asset | null;
	assetPickerId: string;
};
