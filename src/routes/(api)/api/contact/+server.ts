import { ActionFailure, fail, json } from "@sveltejs/kit";
import { SECRET_RECAPCHA_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";
import { IsEmptyString } from "$lib/client/utils/type";

export const POST: RequestHandler = async ({ request }) : Promise<Response> => {

	try {
		const formData = await request.formData()
		const {nom,token} =  Object.fromEntries(formData);

		if(IsEmptyString(token)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le token recapcha ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(nom)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le nom ne doit pas être vide" }), { status: 400 });
		}
	 
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_RECAPCHA_KEY}&response=${token}`;

		const recapchaPostResponse = await fetch(url, {method: 'post'})
		const recacpchaResponse = await recapchaPostResponse.json()

		if(!recacpchaResponse.success){
			return new Response(JSON.stringify({type:"error", errorMsg: "Erreur recapcha" }), { status: 400 });
		}

		return new Response(JSON.stringify({type:"success",}), { status: 200 });


	} catch (error) {
		return new Response(JSON.stringify({ type:"error",errorMsg: error instanceof Error ? error.message : "Erreur survenue" }), { status: 500 });
	}
}
