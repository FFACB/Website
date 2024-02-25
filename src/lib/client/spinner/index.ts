import { writable, type Subscriber } from 'svelte/store';

const spinner = writable(false);

export function subscribeSpinner(callback: Subscriber<boolean>) {
	return spinner.subscribe(callback);
}

export function showSpinner() {
	spinner.set(true);
}

export function hideSpinner() {
	spinner.set(false);
}
