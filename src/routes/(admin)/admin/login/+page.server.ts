import { auth } from '$lib/server/lucia';
import type { Action, Actions, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();

	if (session) {
		throw redirect(302, '/admin/home');
	}

	return {};
};

export const actions: Actions = {
	login: async ({ request, params, locals, cookies }) => {


	
        const data = Object.fromEntries(await request.formData());
        const {email, password} = data;

		if (email == null || (typeof email !== 'string') || email.length < 1) {
			return fail(400, {
				data: data,
				errorMsg: 'Mail incorrect'
			});
		}

		if (password == null || (typeof password !== 'string') || password.length < 1) {
			return fail(400, {
				data: data,
				errorMsg: 'Mot de passe incorrect'
			});
		}

        try {

			let key = await auth.useKey('email', email , password );

            const session = await auth.createSession({
                userId: key.userId,
                attributes: {} // expects `Lucia.DatabaseSessionAttributes`
            });

            locals.auth.setSession(session);
		} catch (err) {
			
            return fail(400, {
				data: data,
				errorMsg: 'Identifiants incorrects'
			});
		}

        return {
            data,
            errorMsg: undefined,
        };
	}
};



// const createDefaultUser = async () => {

//     try{
//         await auth.createUser({
//             key: {
//                 providerId : "email",
//                 providerUserId : SECRET_ADMIN_EMAIL,
//                 password:SECRET_ADMIN_PASSWORD
//             },
//             attributes: {
//                 email:SECRET_ADMIN_EMAIL
//             }
//         })
//     }catch(err){

//     }
//     //CREATE USER
   



// }