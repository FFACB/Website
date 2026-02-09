import { prisma } from '$lib/server/prisma';
import type { Actualite, FileAsset, PictureAsset, VideoAsset } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions.js';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const actualite: Actualite | null = await prisma.actualite.findUnique({
		where: {
			id
		}
	});

	const pictureAsset = await prisma.pictureAsset.findUnique({
		where: {
			id: actualite?.pictureAssetId_Principale ?? ''
		}
	});

	return {
		backlink: '/admin/actualites',
		active: 'actualites',
		actualite: actualite as Actualite | null,
		pictureAsset: pictureAsset as PictureAsset | null,
	};
};

export const actions: Actions = {
	upsert: action_upsert,
	delete: action_delete
};
