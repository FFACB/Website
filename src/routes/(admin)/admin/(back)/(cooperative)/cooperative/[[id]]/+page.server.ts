import { prisma } from '$lib/server/prisma';
import type { Cooperative, CooperativeRegion } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const cooperative: Cooperative | null = await prisma.cooperative.findUnique({
		where: {
			id
		}
	});

	const cooperativeRegion: CooperativeRegion | null = await prisma.cooperativeRegion.findUnique({
		where: {
			id: cooperative?.cooperativeRegionId ?? ''
		}
	});

	const cooperativeRegions = await prisma.cooperativeRegion.findMany();

	return {
		backlink: '/admin/cooperatives',
		active: 'cooperatives',
		cooperative: cooperative as Cooperative | null,
		cooperativeRegion: cooperativeRegion as CooperativeRegion | null,
		cooperativeRegions : cooperativeRegions as CooperativeRegion[]
	};
};

export const actions: Actions = {
	upsert: action_upsert,
	delete: action_delete
};
