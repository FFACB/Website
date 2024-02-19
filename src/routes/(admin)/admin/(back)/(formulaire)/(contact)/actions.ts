// actions.ts
import { fail, type RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/lucia';
import type { Contact } from '@prisma/client';


const authAction = async (event: RequestEvent): Promise<boolean> => {
	return event.locals.user != null;
};

export const action_delete = async (event: RequestEvent) => {
	if (!(await authAction(event))) {
		return fail(400, {
			data: undefined,
			errorMsg: "Vous n'etes pas connecté"
		});
	}

	const { request } = event;
	const data = Object.fromEntries(await request.formData());
	const { id } = data;

	if (id == null || id == '') {
		return fail(400, {
			data: data,
			errorMsg: "❌ L'identifiant du contact est requis"
		});
	}

	try {
		const contactToDelete: Contact | null = await prisma.contact.findUnique({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		if (contactToDelete == null) {
			return fail(400, {
				data: data,
				errorMsg: "Le contact n'existe pas"
			});
		}

		await prisma.contact.delete({
			where: {
				id: typeof id === 'string' ? id : id.toString()
			}
		});

		return {
			data: undefined,
			errorMsg: undefined
		};
	} catch (err) {
		return fail(400, {
			data: data,
			errorMsg: "❌ Une erreur est survenue lors de la suppression du contact"
		});
	}
};
