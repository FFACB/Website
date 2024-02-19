// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/lucia';
import { IsEmptyString, IsPhoto } from '$lib/client/utils/type.js';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import type { Actualite } from '@prisma/client';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';

const FULL_UPLOAD_PATH = `${PUBLIC_UPLOADS_FOLDER_NAME}/actualites/`
const PARTIAL_UPLOAD_PATH = `/${PUBLIC_UPLOADS_FOLDER_NAME}/actualites/`

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_upsert = async (event: RequestEvent) => {

    if (!(await authAction(event))) {
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}


	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	let { id, titre, redacteur, tempsLecture, descriptionCourte, contenu, photo, photoFile } = data;


	if ( id != null && id != undefined && typeof id !== 'string') {
		return fail(400, {
			data: data,
			errorMsg: "❌ L'Id doit être null ou une chaine de caractère"
		});
	}

	if (IsEmptyString(titre)) {
		return fail(400, {
			data: data,
			errorMsg: '❌ Le titre ne doit pas être vide'
		});
	}

	if (IsEmptyString(redacteur)) {
		return fail(400, {
			data: data,
			errorMsg: '❌ Le redacteur ne doit pas être vide'
		});
	}

	if (IsEmptyString(tempsLecture)) {
		return fail(400, {
			data: data,
			errorMsg: '❌ Le temps de lecture ne doit pas être vide'
		});
	}

	if (IsEmptyString(descriptionCourte)) {
		return fail(400, {
			data: data,
			errorMsg: '❌ La description courte ne doit pas être vide'
		});
	}

	if (photo != null && photo != undefined && typeof photo !== 'string') {
		return fail(400, {
			data: data,
			errorMsg: '❌ La photo doit être null ou une chaine de caractère'
		});
	}

	if (contenu != null && contenu != undefined && typeof contenu !== 'string') {
		return fail(400, {
			data: data,
			errorMsg: '❌ Le contenu doit être null ou une chaine de caractère'
		});
	}

	try {


		if (IsPhoto(photoFile) && photoFile instanceof File) {
			if (!existsSync(FULL_UPLOAD_PATH)) {
				mkdirSync(FULL_UPLOAD_PATH);
			}

			const fsPhotoPath = `${FULL_UPLOAD_PATH}${photoFile.name}`;
			const dbPhotoPath = `${PARTIAL_UPLOAD_PATH}${photoFile.name}`;

			writeFileSync(fsPhotoPath, Buffer.from(await photoFile.arrayBuffer()));
			photo = dbPhotoPath;
		}

		const actualite = await prisma.actualite.upsert({
			where: {
				id
			},
			create: {
				titre : titre as string,
				redacteur  : redacteur as string,
				tempsLecture  : tempsLecture as string,
				descriptionCourte  : descriptionCourte as string,
				photo,
				contenu
			},
			update: {
                titre : titre as string,
				redacteur  : redacteur as string,
				tempsLecture  : tempsLecture as string,
				descriptionCourte  : descriptionCourte as string,
                photo,
				contenu
			}
		});

		return {
			data: actualite,
			errorMsg: undefined
		};
	} catch (err) {
		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'actualité"
		});
	}
};
export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
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
			data: undefined,
			errorMsg: undefined
		};
	} catch (err) {
		return fail(400, {
			data: data,
			errorMsg: "❌ Une erreur est survenue lors de la suppression de l'actualité"
		});
	}
};
