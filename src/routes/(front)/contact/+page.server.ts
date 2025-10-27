import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';

export const prerender = 'auto';

export const load: PageServerLoad = async () => {
	const PUBLIC_RECAPCHA_SITEKEY = await getParametre('PUBLIC_RECAPCHA_SITEKEY');

	return {
		parametres: {
			PUBLIC_RECAPCHA_SITEKEY
		},
		actualites
	};
};

const actualites = [
	{
		id: 1,
		title: 'Quelles sont les étapes pour faire construire sa maison individuelle ?',
		image: '/images/aa13a171-ec01-489e-bd5d-36032fb5352b.jpg',
		description:
			"Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques points incontournables pour garantir l'aboutissement de son projet en toute sérénité."
	},
	{
		id: 2,
		title: 'Quelles sont les étapes pour faire construire sa maison individuelle ?',
		image: '/images/AGC/Image1.jpg',
		description:
			"Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques points incontournables pour garantir l'aboutissement de son projet en toute sérénité."
	},
	{
		id: 3,
		title: 'Quelles sont les étapes pour faire construire sa maison individuelle ?',
		image: '/images/AGC/Image4.jpg',
		description:
			"Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques points incontournables pour garantir l'aboutissement de son projet en toute sérénité."
	}
];
