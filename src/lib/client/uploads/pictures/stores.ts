import { writable, type Subscriber } from 'svelte/store';
import { actions, type PictureAction, type PicturePickerAction } from './stores-actions';

const picturesPanel = writable({open:false, picturePickerId:""});


export function subscribePicturesPanel(callback: Subscriber<PicturePickerAction>) {
	return picturesPanel.subscribe(callback);
}

export function showPictures(_picturePickerId : string) {
	picturesPanel.set({open:true,picturePickerId:_picturePickerId});
}

export function hidePictures(_picturePickerId : string = "") {
	picturesPanel.set({open:false,picturePickerId:_picturePickerId});
}


const pictureActionStore = writable<PictureAction>({type: actions.DEFAULT, picture: null, picturePickerId: ""});

export function subscribePicturesAction(picturePickerId : string , callback: Subscriber<PictureAction>) {
	

	return pictureActionStore.subscribe((pictureAction => {
			callback(pictureAction)
	}));
}
 
export function triggerPictureAction(type:string, picture: Picture, picturePickerId : string) {
	pictureActionStore.set({type, picture,picturePickerId});
}