import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ params }) => {
    const user = await prisma.user.findFirst({})


    //CREATE USER
    // await auth.createUser({
    //     key: {
    //         providerId : "email",
    //         providerUserId : "guillianvibert90@gmail.com",
    //         password:"ahXeb2ek5X"
    //     },
    //     attributes: {
    //         email:"guillianvibert90@gmail.com"
    //     }
    // })


	return {
		user,
	}
}
