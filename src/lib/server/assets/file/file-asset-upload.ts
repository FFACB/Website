
import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { Resolution, resolutionMax } from '$lib/client/assets/pictures/resolution';
import { Quality, quality100 } from '$lib/client/assets/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { IsEmptyString, IsPhoto, IsSvg } from '$lib/client/utils/type.js';
import type { Asset, FileAsset, PictureAsset } from '@prisma/client';


export async function saveFileAsset(
	assetID: string | FormDataEntryValue,
	assetRelationOptions: {
		name?: | string | FormDataEntryValue | null;
		required?: boolean;
	} = {
		name: '',
		required: true
	},
): Promise<{
	succes: boolean;
	relation: FileAsset | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	let {
		required = false,
        name = '',
	} = assetRelationOptions;

	try {
		const asset = await prisma.asset.findUnique({
			where: {
				id: assetID.toString()
			}
		});

		if (asset == null) {
			return {
				succes: false,
				errorPass: !required,
				relation: null,
				errorMsg: "Le fichier n'existe pas"
			};
		}

	
		if(IsEmptyString(name)){
            name = asset.originalFilename;
        }
		
		let fileAsset = await prisma.fileAsset.findFirst({
			where: {
				name: name as string,
				asset: {
					id: asset.id
				}
			}
		});

		if (fileAsset == null) {
			fileAsset = await prisma.fileAsset.create({
				data: {
                    name: name as string,
					path: asset.path,
					asset: {
						connect: {
							id: asset.id
						}
					}
				}
			});
		}

		return { succes: true, errorPass: false, relation: fileAsset, errorMsg: '' };
	} catch (exeption) {
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}
