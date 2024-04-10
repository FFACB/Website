import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import type { Actualite } from '@prisma/client';

export type ActualiteListing = {
	id: string;
    titre: string;
    pictureRelationIdPrincipale: string;
    redacteur: string;
    tempsLecture: string;
    descriptionCourte: string;
    contenu: string;
    createdAt: Date;
	photo:string | null
}

export const load: PageServerLoad = async () => {

	const actualites: ActualiteListing[] = await Promise.all((await prisma.actualite.findMany()).map(async actualite => {
		const pictureRelation = await prisma.pictureRelation.findUnique({
			where:{
				id: actualite.pictureRelationIdPrincipale
			}
		})

		return {...actualite,photo : pictureRelation?.path} as ActualiteListing
	}));
	
	return {
		backlink: '/admin/home',
		active: 'actualites',
		actualites
	};
};

export const actions: Actions = {
	delete: action_delete
};
