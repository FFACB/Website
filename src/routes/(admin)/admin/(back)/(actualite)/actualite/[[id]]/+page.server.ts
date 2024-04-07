import { prisma } from '$lib/server/prisma';
import type { Actualite, PictureRelation } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions.js';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const actualite: Actualite | null = await prisma.actualite.findUnique({
		where: {
			id
		},
	});

	const pictureRelation1 = await prisma.pictureRelation.findUnique({
		where:{
			id: actualite?.pictureRelationIdPrincipale ?? ""
		}
	})

	
	const pictureRelation2 = await prisma.pictureRelation.findUnique({
		where:{
			id: actualite?.pictureRelationIdSecondaire ?? ""
		}
	})

	return {
		backlink: '/admin/actualites',
		active: 'actualites',
		actualite: actualite as Actualite | null,
		pictureRelation1 : pictureRelation1 as PictureRelation | null,
		pictureRelation2 : pictureRelation2 as PictureRelation | null
	};
};

export const actions: Actions = {
	upsert: action_upsert,
	delete: action_delete
};
