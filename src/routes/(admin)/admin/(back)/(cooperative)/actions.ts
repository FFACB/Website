import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { Cooperative } from '@prisma/client';
import { logger } from '$lib/server/logs';
import { savePictureAsset } from '$lib/server/assets/picture/picture-asset-upload';

const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_upsert = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/cooperative');

		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const {
		id,
		name,
		siren,
		cooperativeRegionId,
		adresse,
		infoComplementaire,
		ville,
		siteInternet,
		adresseMail,
		telephone,
		contact1Nom,
		contact1telephone,
		contact1Email,
		contact2Nom,
		contact2telephone,
		contact2Email,
		latitude,
		longitude,
		pp_id_0,
		pp_quality_0,
		pp_resolution_0,
		pp_id_1,
		pp_quality_1,
		pp_resolution_1,
		pp_id_2,
		pp_quality_2,
		pp_resolution_2,
		lienVideo
	} = data;

	let { cp } = data;
	if (id != null && id != undefined && typeof id !== 'string') {
		logger.warn({}, "L'Id doit être null ou une chaine de caractère", '/admin/cooperative');

		return fail(400, {
			data: data,
			errorMsg: "❌ L'Id doit être null ou une chaine de caractère"
		});
	}

	if (IsEmptyString(name)) {
		logger.warn({}, 'Le nom ne doit pas être vide', '/admin/cooperative');

		return fail(400, {
			data: data,
			errorMsg: '❌ Le nom ne doit pas être vide'
		});
	}

	if (IsEmptyString(cp)) {
		cp = '0';
	}

	try {
		const savePhoto1 = await savePictureAsset(pp_id_0, {
			resolution: pp_resolution_0,
			quality: pp_quality_0,
			required: false
		});

		if (!savePhoto1.succes && !savePhoto1.errorPass) {
			logger.warn({}, savePhoto1.errorMsg, '/admin/cooperative');

			return fail(400, {
				data: data,
				errorMsg: savePhoto1.errorMsg
			});
		}

		const savePhoto2 = await savePictureAsset(pp_id_1, {
			resolution: pp_resolution_1,
			quality: pp_quality_1,
			required: false
		});

		if (!savePhoto2.succes && !savePhoto2.errorPass) {
			logger.warn({}, savePhoto2.errorMsg, '/admin/cooperative');

			return fail(400, {
				data: data,
				errorMsg: savePhoto2.errorMsg
			});
		}

		const savePhoto3 = await savePictureAsset(pp_id_2, {
			resolution: pp_resolution_2,
			quality: pp_quality_2,
			required: false
		});

		if (!savePhoto3.succes && !savePhoto3.errorPass) {
			logger.warn({}, savePhoto3.errorMsg, '/admin/cooperative');

			return fail(400, {
				data: data,
				errorMsg: savePhoto3.errorMsg
			});
		}

		const cooperative: Cooperative | null = await prisma.cooperative.upsert({
			where: {
				id
			},
			create: {
				name: name as string,
				cooperativeRegionId: cooperativeRegionId as string,
				siren: siren as string,
				adresse: adresse as string,
				infoComplementaire: infoComplementaire as string,
				cp: parseInt((cp as string) ?? '0'),
				ville: ville as string,
				siteInternet: siteInternet as string,
				adresseMail: adresseMail as string,
				telephone: telephone as string,
				contact1Nom: contact1Nom as string,
				contact1telephone: contact1telephone as string,
				contact1Email: contact1Email as string,
				contact2Nom: contact2Nom as string,
				contact2telephone: contact2telephone as string,
				contact2Email: contact2Email as string,
				latitude: latitude as string,
				longitude: longitude as string,
				pictureAsset1Id_Principale: savePhoto1.relation?.id ?? '',
				pictureAsset2Id_Principale: savePhoto2.relation?.id ?? '',
				pictureAsset3Id_Principale: savePhoto3.relation?.id ?? '',
				lienVideo: lienVideo as string
			},
			update: {
				name: name as string,
				cooperativeRegionId: cooperativeRegionId as string,
				siren: siren as string,
				adresse: adresse as string,
				infoComplementaire: infoComplementaire as string,
				cp: parseInt((cp as string) ?? '0'),
				ville: ville as string,
				siteInternet: siteInternet as string,
				adresseMail: adresseMail as string,
				telephone: telephone as string,
				contact1Nom: contact1Nom as string,
				contact1telephone: contact1telephone as string,
				contact1Email: contact1Email as string,
				contact2Nom: contact2Nom as string,
				contact2telephone: contact2telephone as string,
				contact2Email: contact2Email as string,
				latitude: latitude as string,
				longitude: longitude as string,
				pictureAsset1Id_Principale: savePhoto1.relation?.id ?? '',
				pictureAsset2Id_Principale: savePhoto2.relation?.id ?? '',
				pictureAsset3Id_Principale: savePhoto3.relation?.id ?? '',
				lienVideo: lienVideo as string
			}
		});

		const cooperativeRegion = await prisma.cooperativeRegion.findUnique({
			where: {
				id: cooperative?.cooperativeRegionId
			}
		});

		return {
			cooperative,
			cooperativeRegion,
			pictureAsset1: savePhoto1.relation,
			pictureAsset2: savePhoto2.relation,
			pictureAsset3: savePhoto3.relation,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/cooperative');

		return fail(400, {
			data: undefined,
			errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'cooperative"
		});
	}
};
export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		logger.error({}, "Vous n'etes pas connecté", '/admin/cooperative');
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		logger.warn({}, "L'identifiant de l'cooperative est requis", '/admin/cooperative');
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant de l'cooperative est requis"
		});
	}

	try {
		const cooperativeToDelete: Cooperative | null = await prisma.cooperative.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (cooperativeToDelete == null) {
			logger.warn({}, "L'cooperative n'existe pas", '/admin/cooperative');
			return fail(400, {
				data: data,
				errorMsg: "L'cooperative n'existe pas"
			});
		}

		await prisma.cooperative.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			id,
			errorMsg: undefined
		};
	} catch (err) {
		logger.error(err, '/admin/cooperative');
		return fail(400, {
			data: data,
			errorMsg: "❌ Une erreur est survenue lors de la suppression de l'cooperative"
		});
	}
};
