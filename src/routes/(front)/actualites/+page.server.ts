import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';
import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
	const ACTUALITES_PAR_PAGE = 6;

	const page = url.searchParams.get('page') ?? '1';
	let pageNumber = 1;
	try {
		pageNumber = parseInt(page);
	} catch (_) {}

	const query = {
		skip: (pageNumber - 1) * ACTUALITES_PAR_PAGE,
		take: ACTUALITES_PAR_PAGE
	} satisfies Prisma.ActualiteFindManyArgs;
	const [actualitesRaw, count] = await prisma.$transaction([
		prisma.actualite.findMany(query),
		prisma.actualite.count()
	]);


	const maxPageNumber = Math.ceil(count / ACTUALITES_PAR_PAGE);
	const pages = Array.from({ length: maxPageNumber }, (_, i) => i + 1);

	const actualites: ActualiteListing[] = await Promise.all(
		actualitesRaw.map(async (actualite) => {
			const pictureAsset = await prisma.pictureAsset.findUnique({
				where: {
					id: actualite.pictureAssetId_Principale
				}
			});

			return { ...actualite, photo: pictureAsset?.path } as ActualiteListing;
		})
	);

	if (actualites.length == 0) {
		error(404);
	}

	return {
		actualitesDatas : {
			actualites,
			count,
			pageNumber,
			maxPageNumber,
			pages
		}
	};
};
