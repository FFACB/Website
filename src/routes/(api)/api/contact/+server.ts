import type { RequestHandler } from "./$types";
import { IsEmptyString } from "$lib/client/utils/type";
import { prisma } from '$lib/server/prisma';
import { getParametre } from "$lib/server/parametres/parametres";
export const POST: RequestHandler = async ({ request }) : Promise<Response> => {




	try {
		const formData = await request.formData()
		const {nom,prenom, email,telephone,message,token} =  Object.fromEntries(formData);


		const ParamReCapchaSecret =await getParametre("SECRET_RECAPCHA_KEY")

		if(!ParamReCapchaSecret.success){
			return new Response(JSON.stringify({ type:"error",errorMsg: "La clé recapcha est invalide !" }), { status: 400 });
		}
	

		if(IsEmptyString(token)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le token recapcha ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(nom)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le nom ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(prenom)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le prenom ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(email)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "L'email ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(telephone)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le telephone ne doit pas être vide" }), { status: 400 });
		}

		if(IsEmptyString(message)){
			return new Response(JSON.stringify({ type:"error",errorMsg: "Le message ne doit pas être vide" }), { status: 400 });
		}

	 
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${ParamReCapchaSecret.value}&response=${token}`;
	
		const recapchaPostResponse = await fetch(url, {method: 'post'})
		const recacpchaResponse = await recapchaPostResponse.json()

		if(!recacpchaResponse.success){
			return new Response(JSON.stringify({type:"error", errorMsg: "Erreur recapcha" }), { status: 400 });
		}


		const contact = await prisma.contact.create({
			data:{
				nom:nom as string,
				prenom:prenom as string,
				email:email as string,
				telephone:telephone as string,
				message:message as string,
			}
		})
		
		return new Response(JSON.stringify({type:"success",message:"Formulaire envoyé !"}), { status: 200 });


	} catch (error) {
		return new Response(JSON.stringify({ type:"error",errorMsg: error instanceof Error ? error.message : "Erreur survenue" }), { status: 500 });
	}
}
