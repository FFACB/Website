export type CategoryAssetType = {
	id: string;
	path: string;
	filename: string;
	extension: string;
	originalFilename: string;
	createdAt: Date;
	assetCategoryId: string;
	assetCategory: {
		name: string;
	};
};
