import { writable, type Subscriber } from 'svelte/store';

const pictures = writable(false);

export function subscribePictures(callback: Subscriber<boolean>) {
	return pictures.subscribe(callback);
}

export function showPictures() {
	pictures.set(true);
}

export function hidePictures() {
	pictures.set(false);
}
