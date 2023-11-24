
import { page } from '$app/stores';
import type { PageServerLoad } from '../$types';
import { auth } from '$lib/server/lucia'
import type { ServerLoadEvent } from '@sveltejs/kit';
import { error, fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (!session ) {
		throw redirect(301, '/admin/login')
	}

	
};