import { json } from "@sveltejs/kit";

export async function POST(request: Request) {

	try {
		return json({ message: 'Formulaire soumis avec succès!' });
	} catch (error) {
		console.error('Erreur lors de la gestion de la requête:', error);
		return {
			status: 500,
			body: { error: "Une erreur s'est produite lors de la soumission du formulaire." }
		};
	}
}
