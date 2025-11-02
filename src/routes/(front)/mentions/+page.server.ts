import type { PageServerLoad } from '../$types';

const mentionsLegales = {
	$website$: 'https://www.ffacb.fr',
	$formJuridique$: 'Association loi 1901 ou assimilé',
	$nomEntreprise$: 'FEDERATION FRANCAISE DES ARTISANS COOPERATEURS DU BATIMENT',
	$csEntreprise$: '4000,00',
	$tvaEntreprise$: 'FR61350715900',
	$adresseEntreprise$: '3 B RUE DE SAINTE FOIX, 24500 EYMET',
	$cpEntreprise$: '24500',
	$villeEntreprise$: 'EYMET',
	$nomWebmaster$: 'Vibert-vallet Guillian',
	$mailWebmaster$: 'vibert.vallet.guillian@gmail.com',
	$nomHebergeur$: 'OVH',
	$adresseHebergeur$: '2 rue Kellermann 59100 Roubaix',
	$telHebergeur$: '1007',
	$cpHebergeur$: '59100',
	$villeHebergeur$: 'Roubaix',
	$representantCnil$: 'Vibert-vallet Guillian',
	$mailCnil$: 'vibert.vallet.guillian@gmail.com',
	$representantEntreprise$: 'Sophie GOMME - Arnaud TROGNEE',
	$donneesCnil$: 'Nom, prénom, adresse, téléphone, email',
	$autreDonneesCnil$: 'Cookies',
	$conservationCnil$: '5 ans',
	$securiteRGPD$: `Afin d'assurer la protection de votre sécurité, nous utilisons le protocole de sécurité de la couche transport pour transmettre des renseignements personnels dans notre système.
    Toutes les données stockées dans notre système sont bien sécurisées et ne sont accessibles qu'à nos employés. Nos employés sont liés par des accords de confidentialité stricts et une violation de cet accord entraînerait le licenciement de l'employé.`
};

export const load: PageServerLoad = async () => {
	return {
		mentionsLegales
	};
};
