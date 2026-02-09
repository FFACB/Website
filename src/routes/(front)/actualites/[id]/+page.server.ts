import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { prisma } from '$lib/server/prisma';
import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';
import type { Actualite, PictureAsset, Prisma } from '@prisma/client';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
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
		actualite: actualite as Actualite | null,
		pictureAsset: pictureAsset as PictureAsset | null
	};
};
