// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString, IsPhoto } from '$lib/client/utils/type.js';
import { logger } from '$lib/server/logs';
import { existsSync, mkdirSync } from 'fs';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';

const FULL_UPLOAD_PATH = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/`;
const PARTIAL_UPLOAD_PATH = `/${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/`;

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
	const data = await request.formData()
    const files = data.getAll('picturesFiles')

	// let { photo } = data;

	// if (photo != null && photo != undefined && typeof photo !== 'string') {
	// 	logger.warn({}, 'La photo doit être null ou une chaine de caractère', '/admin/actualite');

	// 	return fail(400, {
	// 		data: data,
	// 		errorMsg: '❌ La photo doit être null ou une chaine de caractère'
	// 	});
	// }

	try {

        if (!existsSync(FULL_UPLOAD_PATH)) {
            mkdirSync(FULL_UPLOAD_PATH);
        }


        await Promise.all(
            files.map(async (file,i) => {
    
              if (file && file instanceof File && IsPhoto(file)) {
                  
      
                const arrayBuffer = await file.arrayBuffer();

                await sharp(arrayBuffer)
                    .resize(500, 500)
                    .toFormat('webp')
                    .jpeg({ quality: 90 })
                    .toFile(`${FULL_UPLOAD_PATH}${file.name}`);
              //  photo = `${PARTIAL_UPLOAD_PATH}${photoFile.name}`;
                
              }
          })
        )
	
		return {
			data: {},
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/actualite');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'actualité"
		});
	}
};
