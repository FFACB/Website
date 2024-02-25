export function IsJsonString(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export function IsEmptyString(str: string | null | undefined | FormDataEntryValue) {
	try {
		return str == null || typeof str !== 'string' || str.length <= 0;
	} catch (e) {
		return false;
	}
}

export const PhotoExtensions = ['jpg', 'jpeg', 'png', 'webp','bmp','avif','svg'];

export function IsPhoto(obj: File | null | undefined | FormDataEntryValue): boolean {
	try {
		if (obj == null || typeof obj !== 'object' || !(obj instanceof File)) return false;

		const fileExtension = GetExtension(obj.name);
		return PhotoExtensions.includes(fileExtension);
	} catch (e) {
		return false;
	}
}

export function GetExtension(fname: string) {
	const pos = fname.lastIndexOf('.');
	const strlen = fname.length;
	let extension;
	if (pos != -1 && strlen != pos + 1) {
		const ext = fname.split('.');
		const len = ext.length;
		extension = ext[len - 1].toLowerCase();
	} else {
		extension = 'No extension found';
	}
	return extension;
}
