import { prisma } from '$lib/server/prisma';
import type { Partenaire, PictureAsset } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions.js';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const partenaire: Partenaire | null = await prisma.partenaire.findUnique({
		where: {
			id
		}
	});

	const pictureAsset = await prisma.pictureAsset.findUnique({
		where: {
			id: partenaire?.pictureAssetId_Logo ?? ''
		}
	});

	return {
		backlink: '/admin/partenaires',
		active: 'partenaires',
		partenaire: partenaire as Partenaire | null,
		pictureAsset: pictureAsset as PictureAsset | null
	};
};

export const actions: Actions = {
	upsert: action_upsert,
	delete: action_delete
};
