import { writable, type Subscriber } from 'svelte/store';
import { actions, type PictureAction } from './actions';

const picturesPanel = writable(false);


export function subscribePicturesPanel(callback: Subscriber<boolean>) {
	return picturesPanel.subscribe(callback);
}

export function showPictures() {
	picturesPanel.set(true);
}

export function hidePictures() {
	picturesPanel.set(false);
}


const pictureActionStore = writable<PictureAction>({type: actions.DEFAULT, picture: null});

export function subscribePicturesAction(callback: Subscriber<PictureAction>) {
	return pictureActionStore.subscribe(callback);
}

export function triggerPictureAction(type:string, picture: Picture) {
	pictureActionStore.set({type, picture});
}