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
		pictureId,
		pp_id_0,
		pp_resolution_0,
		pp_quality_0
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

	let pictureRelation = null;
	try {
		let pictureId = '';
		if (
			typeof pp_id_0 === 'string' &&
			typeof pp_resolution_0 === 'string' &&
			typeof pp_quality_0 === 'string'
		) {
			const picture = await prisma.picture.findUnique({
				where: {
					id: pp_id_0
				}
			});

			pictureId = picture?.id as string;

			if (picture == null) {
				logger.warn({}, "L'image n'existe pas", '/admin/actualite');
				return fail(400, {
					data: data,
					errorMsg: "L'image n'existe pas"
				});

				
			}

			const resolution =  pp_resolution_0.length == 0 ? resolutionMax : resolutions.find((r) => r.value() === parseInt(pp_resolution_0) );
				
			if(resolution == null) {
				logger.warn({}, "La résolution n'existe pas", '/admin/actualite');
				return fail(400, {
					data: data,
					errorMsg: "La résolution n'existe pas"
				});
			}

			const quality = qualities.find((q) => q.value() === parseInt(pp_quality_0));
			if(quality == null) {
				logger.warn({}, "La qualité n'existe pas", '/admin/actualite');
				return fail(400, {
					data: data,
					errorMsg: "La qualité n'existe pas"
				});
			}

			const arrayBuffer = readFileSync(`${picture.path.slice(1)}`);
			const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/${resolution.toString()}/${quality.toString()}/`;
			if (!existsSync(filepath)) {
				mkdirSync(filepath, { recursive: true });
			}

			let filename = `${picture.id}`;

			if (picture.extension !== 'svg') {
				filename += '.webp';

				await sharp(arrayBuffer)
					.resize(
						resolution.value(),
						resolution.value(),
						{
							fit: 'inside', // 'inside' ensures that the image is not upscaled
							withoutEnlargement: true // Prevent enlargement of smaller images
						}
					)

					.webp({  quality: quality.value()})
					.toFile(`${filepath}${filename}`);
			} else {
				filename += '.svg';
				writeFileSync(`${filepath}${filename}`, Buffer.from(arrayBuffer));
			}

			
			pictureRelation = await prisma.pictureRelation.create({
				data: {
					quality: quality.value() as number,
					resolution: resolution.value(),
					picture: {
						connect: {
							id: pictureId
						}
					}
				}
			});


			// const filename

			// const readFile = readFileSync(`${picture.path}`);
			// writeFileSync(`${filepath}${}`, Buffer.from(readFile));

			// if (IsPhoto(photoFile) && photoFile instanceof File) {

			// 	const fsPhotoPath = `${FULL_UPLOAD_PATH}${photoFile.name}`;
			// 	const dbPhotoPath = `${PARTIAL_UPLOAD_PATH}${photoFile.name}`;

			// 	photo = dbPhotoPath;
			// }
		}

		const actualite = await prisma.actualite.upsert({
			where: {
				id
			},
			create: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				picture: {
					connect: {
						id: pictureRelation?.id
					}
				},
				contenu
			},
			update: {
				titre: titre as string,
				redacteur: redacteur as string,
				tempsLecture: tempsLecture as string,
				descriptionCourte: descriptionCourte as string,
				picture: {
					connect: {
						id: pictureRelation?.id
					}
				},
				contenu
			}
		});

		return {
			data: actualite,
			errorMsg: undefined
		};
	} catch (err) {
		console.log(err);
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
