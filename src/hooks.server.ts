// import { handleHooks } from "@lucia-auth/sveltekit"
import { auth } from '$lib/server/lucia'
import type { Handle } from '@sveltejs/kit'
// import { sequence } from "@sveltejs/kit/hooks"

export const handle: Handle = async (serverEvent) => {
    const { resolve, event } = serverEvent
    const { locals } = event
    locals.auth = auth.handleRequest(event);


    //AUTH
    // const key = await auth.useKey('email', "guillianvibert90@gmail.com", "ahXeb2ek5X")

    // const session = await auth.createSession({
	// 	userId:key.userId,
	// 	attributes: {
            
    //     } // expects `Lucia.DatabaseSessionAttributes`
	// });
   
    // const sessionCookie = auth.createSessionCookie(session);
     
	// const response = await resolve(event)
	// response.headers.append("Set-Cookie", sessionCookie.serialize());


	return await resolve(event) // response
}