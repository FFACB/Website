import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const prerender = false;

export type PartenaireListing = {
	id: string;
	name: string;
	description: string;
	siteInternet: string;
	logo: string | null;
};

export const load: PageServerLoad = async () => {
	const partenaires: PartenaireListing[] = (
		await Promise.all(
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

				return {
					id: partenaire.id,
					name: partenaire.name,
					description: partenaire.description,
					siteInternet: partenaire.siteInternet,
					logo: pictureAsset?.path ?? null
				} as PartenaireListing;
			})
		)
	).filter((partenaire) => partenaire.logo != null && partenaire.logo.length > 0);

	return {
		partenaires
	};
};
