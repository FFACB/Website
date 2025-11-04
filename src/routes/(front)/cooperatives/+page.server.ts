import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';

export const prerender = false

export const load: PageServerLoad = async () => {
	const PUBLIC_GOOGLE_API_KEY = await getParametre('PUBLIC_GOOGLE_API_KEY');
	const cooperatives = await prisma.cooperative.findMany({
		include: {
			cooperativeRegion: true
		}
	});


	return {
		parametres: {
			PUBLIC_GOOGLE_API_KEY
		},
		cooperatives: cooperatives as CooperativeFull[]
	};
};


