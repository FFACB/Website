
import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { Resolution, resolutionMax } from '$lib/client/assets/pictures/resolution';
import { Quality, quality100 } from '$lib/client/assets/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { IsEmptyString, IsPhoto, IsSvg } from '$lib/client/utils/type.js';
import type { Asset, VideoAsset, PictureAsset } from '@prisma/client';


export async function saveVideoAsset(
	assetID: string | FormDataEntryValue,
	assetRelationOptions: {
        controls?: boolean | FormDataEntryValue | null;
        autoplay?: boolean | FormDataEntryValue | null;
        loop?: boolean | FormDataEntryValue | null;
		name?: | string | FormDataEntryValue | null;
		required?: boolean;
	} = {
        controls:false,
        autoplay:false,
        loop:false,
		required: true
	},
): Promise<{
	succes: boolean;
	relation: VideoAsset | null;
	errorMsg: string;
	errorPass: boolean;
}> {
	let {
		required = false,
        controls=false,
        autoplay=false,
        loop=false,
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
				errorMsg: "La video n'existe pas"
			};
		}


		if(controls == null){
			controls = false;
		}

		if(typeof controls == 'string'){
			controls = controls == 'on';
		
		}

		if(autoplay == null){
			autoplay = false;
		}

		if(typeof autoplay == 'string'){
			autoplay = autoplay == 'on';
		
		}

		if(loop == null){
			loop = false;
		}

		if(typeof loop == 'string'){
			loop = loop == 'on';
		
		}


		let videoAsset = await prisma.videoAsset.findFirst({
			where: {
				controls:controls as boolean,
                autoplay:autoplay as boolean,
                loop:loop as boolean,
				asset: {
					id: asset.id
				}
			}
		});
		
		if (videoAsset == null) {
			videoAsset = await prisma.videoAsset.create({
				data: {
                    controls:controls as boolean,
                    autoplay:autoplay as boolean,
                    loop:loop as boolean,
					path: asset.path,
					asset: {
						connect: {
							id: asset.id
						}
					}
				}
			});
		}

		console.log(videoAsset);
		return { succes: true, errorPass: false, relation: videoAsset, errorMsg: '' };
	} catch (exeption) {
		return { succes: false, errorPass: !required, relation: null, errorMsg: '' };
	}
}
