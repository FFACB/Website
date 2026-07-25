import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export type PartenaireListing = {
	id: string;
	name: string;
	description: string;
	siteInternet: string;
	pictureAssetId_Logo: string;
	ordre: number;
	createdAt: Date;
	logo: string | null;
};

export const load: PageServerLoad = async () => {
	const partenaires: PartenaireListing[] = await Promise.all(
		(
			await prisma.partenaire.findMany({
				orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }]
			})
		).map(async (partenaire) => {
			const pictureAsset = await prisma.pictureAsset.findUnique({
				where: {
					id: partenaire.pictureAssetId_Logo
				}
			});

			return { ...partenaire, logo: pictureAsset?.path } as PartenaireListing;
		})
	);

	return {
		backlink: '/admin/home',
		active: 'partenaires',
		partenaires
	};
};

export const actions: Actions = {
	delete: action_delete
};
