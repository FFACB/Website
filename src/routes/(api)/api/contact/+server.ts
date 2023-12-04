import { json } from "@sveltejs/kit";
import { SECRET_RECAPCHA_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) : Promise<Response> => {

	try {

		const data = await request.json();
		
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_RECAPCHA_KEY}&response=${data.token}`;

		const recapchaPostResponse = await  fetch(url, {
			method: 'post'
		})
		const recacpchaResponse = await recapchaPostResponse.json()
		console.log(recacpchaResponse);
		return json({ recacpchaResponse })


	} catch (error) {
		console.error('Erreur lors de la gestion de la requête:', error);
		return {
			status: 500,
			body: { error: "Une erreur s'est produite lors de la soumission du formulaire." }
		};
	}
}
