import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { Partenaire } from '@prisma/client';
import { logger } from '$lib/server/logs';
import { savePictureAsset } from '$lib/server/assets/picture/picture-asset-upload';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_upsert = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/partenaire');

		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id, name, description, siteInternet, pp_id_0, pp_resolution_0, pp_quality_0 } = data;
	let { ordre } = data;

	if (id != null && id != undefined && typeof id !== 'string') {
		logger.warn({}, "L'Id doit être null ou une chaine de caractère", '/admin/partenaire');

		return fail(400, {
			data: data,
			errorMsg: "❌ L'Id doit être null ou une chaine de caractère"
		});
	}

	if (IsEmptyString(name)) {
		logger.warn({}, 'Le nom du partenaire ne doit pas être vide', '/admin/partenaire');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le nom du partenaire ne doit pas être vide'
		});
	}

	if (IsEmptyString(ordre)) {
		ordre = '0';
	}

	try {
		const saveLogo = await savePictureAsset(pp_id_0, {
			resolution: pp_resolution_0,
			quality: pp_quality_0,
			required: true
		});

		if (!saveLogo.succes && !saveLogo.errorPass) {
			logger.warn({}, saveLogo.errorMsg, '/admin/partenaire');

			return fail(400, {
				data: data,
				errorMsg: saveLogo.errorMsg.length > 0 ? saveLogo.errorMsg : '❌ Le logo est requis'
			});
		}

		const partenaire: Partenaire | null = await prisma.partenaire.upsert({
			where: {
				id
			},
			create: {
				name: name as string,
				description: (description as string) ?? '',
				siteInternet: (siteInternet as string) ?? '',
				pictureAssetId_Logo: saveLogo.relation?.id ?? '',
				ordre: parseInt((ordre as string) ?? '0')
			},
			update: {
				name: name as string,
				description: (description as string) ?? '',
				siteInternet: (siteInternet as string) ?? '',
				pictureAssetId_Logo: saveLogo.relation?.id ?? '',
				ordre: parseInt((ordre as string) ?? '0')
			}
		});

		return {
			partenaire,
			pictureAsset: saveLogo.relation,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/partenaire');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement du partenaire"
		});
	}
};

export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/partenaire');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		logger.warn({}, "L'identifiant du partenaire est requis", '/admin/partenaire');
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant du partenaire est requis"
		});
	}

	try {
		const partenaireToDelete: Partenaire | null = await prisma.partenaire.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (partenaireToDelete == null) {
			logger.warn({}, "Le partenaire n'existe pas", '/admin/partenaire');
			return fail(400, {
				data: data,
				errorMsg: "Le partenaire n'existe pas"
			});
		}

		await prisma.partenaire.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			id,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/partenaire');
		return fail(400, {
			data: data,
			errorMsg: '❌ Une erreur est survenue lors de la suppression du partenaire'
		});
	}
};
