
import { page } from '$app/stores';
import { auth } from '$lib/server/lucia'
import type { ServerLoadEvent } from '@sveltejs/kit';
import { error, fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './home/$types';
import Config from './layout.conf.json'
import type { LayoutConfig } from '$lib/client/utils/ambiant';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (!session ) {
		throw redirect(301, '/admin/login')
	}

	return {
		config: Config as LayoutConfig
	}
	
};