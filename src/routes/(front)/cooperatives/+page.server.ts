import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const PUBLIC_GOOGLE_API_KEY = await getParametre('PUBLIC_GOOGLE_API_KEY');

	const cooperatives: CooperativeFull[] = await Promise.all(
		(
			await prisma.cooperative.findMany({
				include: {
					cooperativeRegion: true
				}
			})
		).map(async (cooperative) => {
			const pictureAsset1 = await prisma.pictureAsset.findUnique({
				where: {
					id: cooperative.pictureAsset1Id_Principale
				}
			});

			const pictureAsset2 = await prisma.pictureAsset.findUnique({
				where: {
					id: cooperative.pictureAsset2Id_Principale
				}
			});

			const pictureAsset3 = await prisma.pictureAsset.findUnique({
				where: {
					id: cooperative.pictureAsset3Id_Principale
				}
			});

			return {
				...cooperative,
				photo1: pictureAsset1?.path ?? '',
				photo2: pictureAsset2?.path ?? '',
				photo3: pictureAsset3?.path ?? ''
			} as CooperativeFull;
		})
	);

	return {
		parametres: {
			PUBLIC_GOOGLE_API_KEY
		},
		cooperatives: cooperatives as CooperativeFull[]
	};
};
