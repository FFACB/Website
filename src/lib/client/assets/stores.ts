import { writable, type Subscriber } from 'svelte/store';
import { AssetsActions, AssetsCategories } from './enums';
import type { AssetAction, AssetPickerAction, AssetCategory } from './ambiant';

const assetsPanel = writable({ open: false, assetPickerId: '', assetType: '' });

export function subscribeAssetsPanel(callback: Subscriber<AssetPickerAction>) {
	return assetsPanel.subscribe(callback);
}

export function showAssets(_assetType: string, _assetPickerId: string) {
	assetsPanel.set({ open: true, assetPickerId: _assetPickerId, assetType: _assetType });
}

export function hideAssets(_assetType: string, _assetPickerId: string = '') {
	assetsPanel.set({ open: false, assetPickerId: _assetPickerId, assetType: _assetType });
}

const assetActionStore = writable<AssetAction>({
	actionName: AssetsActions.DEFAULT,
	assetType: AssetsCategories.DEFAULT,
	asset: null,
	assetPickerId: ''
});

export function subscribeAssetsAction(assetPickerId: string, callback: Subscriber<AssetAction>) {
	return assetActionStore.subscribe((assetAction) => {
		callback(assetAction);
	});
}

export function triggerAssetAction(
	assetType: string,
	actionName: string,
	asset: AssetCategory,
	assetPickerId: string
) {
	assetActionStore.set({ assetType, actionName, asset, assetPickerId });
}
