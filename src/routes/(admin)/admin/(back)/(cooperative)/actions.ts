import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { IsEmptyString } from '$lib/client/utils/type.js';
import type { Cooperative } from '@prisma/client';
import { logger } from '$lib/server/logs';

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
		cp,
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
		longitude
	} = data;
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

	try {
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
				longitude: longitude as string
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
				longitude: longitude as string
			}
		});

		return {
			cooperative,
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
