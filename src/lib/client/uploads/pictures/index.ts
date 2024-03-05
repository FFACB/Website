import { writable, type Subscriber } from 'svelte/store';

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


const pictureId = writable<null | Picture>(null);

export function subscribePicturesId(callback: Subscriber<null | Picture>) {
	return pictureId.subscribe(callback);
}


export function setPictureId(picture: Picture) {
	pictureId.set(picture);
}