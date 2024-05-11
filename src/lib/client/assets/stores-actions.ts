import type { Asset } from '@prisma/client';

const AssetsCategories = {
	DEFAULT: 'DEFAULT',
	PICTURE: 'PICTURE',
	VIDEO: 'VIDEO',
	FILE: 'FILE'
};

const AssetsActions = {
	DEFAULT: 'DEFAULT',
	PICKED: 'PICKED',
	DELETE: 'DELETE'
};

export { AssetsActions, AssetsCategories };

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


