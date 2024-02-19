// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/lucia';
import { IsEmptyString } from '$lib/client/utils/type.js';


const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};
export const action_update = async (event: RequestEvent) => {

    if (!(await authAction(event))) {
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}


	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	let { key, value } = data;


	if (IsEmptyString(key)) {
		return fail(400, {
			data: data,
			errorMsg: '❌ La clé ne doit pas être vide'
		});
	}

	if (IsEmptyString(value)) {
		return fail(400, {
			data: data,
			errorMsg: `❌ La valeur de la clé "${key}" ne doit pas être vide`
		});
	}

	await prisma.parametre.update({
		where:{
			key: key as string
		},
		data:{
			value: value as string
		}
	})

};

