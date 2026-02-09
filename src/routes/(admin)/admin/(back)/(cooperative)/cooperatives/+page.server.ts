import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import type { Cooperative } from '@prisma/client';

export const load: PageServerLoad = async () => {
	const cooperatives: Cooperative[] = await prisma.cooperative.findMany();

	return {
		backlink: '/admin/home',
		active: 'cooperatives',
		cooperatives
	};
};

export const actions: Actions = {
	delete: action_delete
};
