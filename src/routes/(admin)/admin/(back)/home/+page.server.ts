import { auth } from '$lib/server/lucia'
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

	
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (!session ) {
		throw redirect(301, '/admin/login')
	}

	return{

		backlink:null,
		active:'home',

	}
}
