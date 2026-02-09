import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {

	const actualites: ActualiteListing[] = await Promise.all(
		(await prisma.actualite.findMany({ take: 3 })).map(async (actualite) => {
			const pictureAsset = await prisma.pictureAsset.findUnique({
				where: {
					id: actualite.pictureAssetId_Principale
				}
			});

			return { ...actualite, photo: pictureAsset?.path } as ActualiteListing;
		})
	);

	return {
		parametres: {
			PUBLIC_HEAD_TAG_MANAGER: await getParametre('PUBLIC_HEAD_TAG_MANAGER'),
			PUBLIC_BODY_TAG_MANAGER: await getParametre('PUBLIC_BODY_TAG_MANAGER')
		},
		actualites
	};
};
