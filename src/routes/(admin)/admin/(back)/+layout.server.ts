
import { page } from '$app/stores';
import { auth } from '$lib/server/lucia'
import type { ServerLoadEvent } from '@sveltejs/kit';
import { error, fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './home/$types';

import LayoutConfig from './layout.conf.json'

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (!session ) {
		throw redirect(301, '/admin/login')
	}

	// const e = LayoutConfig as LayoutConfig;

	return LayoutConfig as ;
	
};