import { auth } from '$lib/server/lucia'
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

	return{

		backlink:null,
		active:'home',

	}
}
