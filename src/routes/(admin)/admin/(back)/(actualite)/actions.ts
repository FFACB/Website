// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString, IsPhoto } from '$lib/client/utils/type.js';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import type { Actualite, PictureRelation } from '@prisma/client';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import { logger } from '$lib/server/logs';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import resolutions, { resolutionMax } from '$lib/client/uploads/pictures/resolution';
import qualities from '$lib/client/uploads/pictures/quality';
import { savePictureRelation } from '$lib/server/uploads/picture-upload';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_upsert = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/actualite');

		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const {
		id,
		titre,
		redacteur,
		tempsLecture,
		descriptionCourte,
		contenu,
		pp_id_0,
		pp_resolution_0,
		pp_quality_0,
	} = data;

	if (id != null && id != undefined && typeof id !== 'string') {
		logger.warn({}, "L'Id doit être null ou une chaine de caractère", '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: "❌ L'Id doit être null ou une chaine de caractère"
		});
	}
	
	if (IsEmptyString(titre)) {
		logger.warn({}, 'Le titre ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le titre ne doit pas être vide'
		});
	}

	if (IsEmptyString(redacteur)) {
		logger.warn({}, 'Le redacteur ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le redacteur ne doit pas être vide'
		});
	}

	if (IsEmptyString(tempsLecture)) {
		logger.warn({}, 'Le temps de lecture ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le temps de lecture ne doit pas être vide'
		});
	}

	if (IsEmptyString(descriptionCourte)) {
		logger.warn({}, 'La description courte ne doit pas être vide', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ La description courte ne doit pas être vide'
		});
	}

	if (contenu != null && contenu != undefined && typeof contenu !== 'string') {
		logger.warn({}, 'Le contenu doit être null ou une chaine de caractère', '/admin/actualite');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le contenu doit être null ou une chaine de caractère'
		});
	}

	try {
		

	    const savePhotoPrincipale = await savePictureRelation(pp_id_0,{
			resolution: pp_resolution_0,
			quality: pp_quality_0,
			required: true
		})

		if (!savePhotoPrincipale.succes && !savePhotoPrincipale.errorPass) {
			logger.warn({}, savePhotoPrincipale.errorMsg, '/admin/actualite');

			return fail(400, {
				data: data,
				errorMsg: savePhotoPrincipale.errorMsg
			});
		}


		let actualite : Actualite | null = await prisma.actualite.upsert({
			where: {
				id
			},
			create: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				pictureRelationIdPrincipale: savePhotoPrincipale.relation?.id ?? "",
				contenu
			},
			update: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				pictureRelationIdPrincipale: savePhotoPrincipale.relation?.id ?? "",
				contenu
			}
		});

		return {
			actualite,
			pictureRelation:savePhotoPrincipale.relation,
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
export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/actualite');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		logger.warn({}, "L'identifiant de l'actualité est requis", '/admin/actualite');
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant de l'actualité est requis"
		});
	}

	try {
		const actualiteToDelete: Actualite | null = await prisma.actualite.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (actualiteToDelete == null) {
			logger.warn({}, "L'actualité n'existe pas", '/admin/actualite');
			return fail(400, {
				data: data,
				errorMsg: "L'actualité n'existe pas"
			});
		}

		await prisma.actualite.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			id,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/actualite');
		return fail(400, {
			data: data,
			errorMsg: "❌ Une erreur est survenue lors de la suppression de l'actualité"
		});
	}
};
