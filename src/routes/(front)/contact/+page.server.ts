import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const PUBLIC_RECAPCHA_SITEKEY = await getParametre('PUBLIC_RECAPCHA_SITEKEY');

	return {
		parametres: {
			PUBLIC_RECAPCHA_SITEKEY
		},
		
	};
};
