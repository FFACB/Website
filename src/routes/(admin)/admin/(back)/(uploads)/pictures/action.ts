// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString, IsPhoto, IsSvg } from '$lib/client/utils/type.js';
import { logger } from '$lib/server/logs';
import { existsSync, mkdirSync , writeFileSync,unlinkSync} from 'fs';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import type { PictureRelation } from '@prisma/client';
import { savePictureUpload } from '$lib/server/uploads/picture-upload';

const FULL_UPLOAD_PATH = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/`;

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_create = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/pictures');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = await request.formData();
	const files = data.getAll('picturesFiles');

	try {
		

		const pictures = await Promise.all(
			files.map(async (file) => {

			   	const savedPicture = await	savePictureUpload(file)
				if(!savedPicture.succes){
					logger.error(savedPicture.errorMsg, '/admin/pictures');
					return;
				}

				return savedPicture.picture

			})
		);

		return {
			data: pictures,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/pictures');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'image"
		});
	}
};

export const action_findall = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/pictures');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	try {
		const pictures = await prisma.picture.findMany({
			select: {
				id: true,
				path: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return {
			data: pictures,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/pictures');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue l'obtentions des images"
		});
	}
};



export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/pictures');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}
	
	const { request } = event;
	const data = await request.formData();
	const {id} = Object.fromEntries(data);

	const picture = await prisma.picture.findUnique({
		where:{
			id:id as string
		},
		include:{
			pictureRelations:true
		}
	});

	if(picture == null){
		logger.warn(data, "L'image n'existe pas", '/admin/pictures');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ L'image n'existe pas"
		});
	}
	
	
	for(const pictureRelation of picture.pictureRelations){

		try {
			unlinkSync(`${pictureRelation.path.slice(1)}`)
		} catch (err) {
			logger.error(err, '/admin/pictures?/delete');
		}
	
	}

	try {
		unlinkSync(`${picture.path.slice(1)}`)
	} catch (err) {
		logger.error(err, '/admin/pictures?/delete');

	}

	
	try {
		await prisma.picture.delete({
			where:{
				id:id as string
			}
		});
	} catch (err) {
		logger.error(err, '/admin/pictures?/delete');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de la suppression virtuelle de l'image"
		});
	}

	return {
		data: id,
		errorMsg: undefined
	};
};
