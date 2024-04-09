import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { Resolution, resolutionMax } from '$lib/client/uploads/pictures/resolution';
import { Quality, quality100 } from '$lib/client/uploads/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import type { PictureRelation } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { IsPhoto, IsSvg } from '$lib/client/utils/type.js';

export async function savePictureRelation(
	pictureID: string | FormDataEntryValue,
	pictureRelationOptions: {
		resolution?: Resolution | number | string | FormDataEntryValue | null;
		quality?: Quality | number | FormDataEntryValue | string;
		required?: boolean;
	} = {
		resolution: resolutionMax,
		quality: quality100,
		required: true
	},
	resizeOptions: sharp.ResizeOptions = {
		fit: 'inside',
		withoutEnlargement: true
	}
): Promise<{
	succes: boolean;
	relation: PictureRelation | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	const {
		required = false,
		resolution = resolutionMax,
		quality = quality100
	} = pictureRelationOptions;

	try {
		const picture = await prisma.picture.findUnique({
			where: {
				id: pictureID.toString()
			}
		});

		if (picture == null) {
			return {
				succes: false,
				errorPass: !required,
				relation: null,
				errorMsg: "L'image n'existe pas"
			};
		}

		const absoluteResolution: Resolution = Resolution.fromInput(resolution?.toString());
		const absoluteQuality: Quality = Quality.fromInput(quality?.toString());

		const arrayBuffer = readFileSync(`${picture.path.slice(1)}`);
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/${absoluteResolution.toString()}/${absoluteQuality.toString()}/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath, { recursive: true });
		}

		let filename = `${picture.id}`;

		if (picture.extension !== 'svg') {
			filename += '.webp';

			await sharp(arrayBuffer)
				.resize(absoluteResolution.value(), absoluteResolution.value(), resizeOptions)
				.webp({ quality: absoluteQuality.value() })
				.toFile(`${filepath}${filename}`);
		} else {
			filename += '.svg';
			writeFileSync(`${filepath}${filename}`, Buffer.from(arrayBuffer));
		}

		let pictureRelation = await prisma.pictureRelation.findFirst({
			where: {
				quality: absoluteQuality.value(),
				resolution: absoluteResolution.value(),
				picture: {
					id: picture.id
				}
			}
		});

		if (pictureRelation == null) {
			pictureRelation = await prisma.pictureRelation.create({
				data: {
					quality: absoluteQuality.value(),
					resolution: absoluteResolution.value(),
					path: `/${filepath}${filename}`,
					picture: {
						connect: {
							id: picture.id
						}
					}
				}
			});
		}

		return { succes: true, errorPass: false, relation: pictureRelation, errorMsg: '' };
	} catch (exeption) {
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}

export async function savePictureUpload(file: File | null | undefined | FormDataEntryValue): Promise<{
	succes: boolean;
	picture: Picture | null;
	errorMsg: string;
}> {
	if (file == null) {
		return {
			succes: false,
			picture: null,
			errorMsg: "L'image n'existe pas"
		};
	}

	if(!(file instanceof File)){
		return {
			succes: false,
			picture: null,
			errorMsg: "L'image n'est pas valide"
		};
	}

	try {
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath);
		}

		const arrayBuffer = await file.arrayBuffer();
		let filename = `${uuid()}`;
		let extension = '';

		if (IsPhoto(file)) {
			extension = 'webp';

			await sharp(arrayBuffer)
				.resize(null, null, {
					fit: 'inside', // 'inside' ensures that the image is not upscaled
					withoutEnlargement: true // Prevent enlargement of smaller images
				})
				.toFormat('webp')
				.toFile(`${filepath}${filename}.${extension}`);
		} else if (IsSvg(file)) {
			extension = 'svg';
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		}

		const picture = await prisma.picture.create({
			data: {
				path: `/${filepath}${filename}.${extension}`,
				extension,
				filename
			}
		});

		return {
			succes: true,
			picture: picture,
			errorMsg: ''
		};
	} catch (exeption) {
		return {
			succes: false,
			picture: null,
			errorMsg: ''
		};
	}
}
