import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from "./(front)/$types"
import { prisma } from "$lib/server/prisma"
import { error, fail } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ params }) => {
  
}
