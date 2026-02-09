import type { PageServerLoad } from '../$types';

	const mentionsLegales = {
		$website$: 'https://www.ffacb.fr',
		$formJuridique$: 'Association loi 1901',
		$nomEntreprise$: 'FÉDÉRATION FRANÇAISE DES ARTISANS COOPÉRATEURS DU BÂTIMENT (FFACB)',
		$csEntreprise$: '4000,00',
		$tvaEntreprise$: 'FR61350715900',
		$adresseEntreprise$: '3 bis avenue de Sainte Foy',
		$cpEntreprise$: '24500',
		$villeEntreprise$: 'Eymet',
		$nomWebmaster$: 'Didier FABIGNON',
		$mailWebmaster$: 'infos@ffacb.com',
		$nomHebergeur$: 'O2Switch', // À remplacer par OVH si besoin
		$adresseHebergeur$: 'CHE DES PARDIAUX', // À remplacer par 2 rue Kellermann 59100 Roubaix si besoin
		$telHebergeur$: '0891651035', // À remplacer par 1007 si besoin
		$cpHebergeur$: '63000', // À remplacer par 59100 si besoin
		$villeHebergeur$: 'CLERMONT FERRAND', // À remplacer par Roubaix si besoin
		$representantCnil$: 'Elodie GICQUEL',
		$mailCnil$: 'egicquel@ffacb.com',
		$representantEntreprise$: 'Didier FABIGNON, Président de la FFACB',
		$donneesCnil$: 'Nom, prénom, adresse, téléphone, email, données de connexion et d’utilisation du site, données de navigation/traceurs (analytics/YouTube), journaux techniques',
		$autreDonneesCnil$: 'Cookies',
		$conservationCnil$: '5 ans',
		$securiteRGPD$: `Afin d'assurer la protection de votre sécurité, nous utilisons le protocole de sécurité de la couche transport pour transmettre des renseignements personnels dans notre système. Toutes les données stockées dans notre système sont bien sécurisées et ne sont accessibles qu'à nos employés. Nos employés sont liés par des accords de confidentialité stricts et une violation de cet accord entraînerait le licenciement de l'employé.`
	};

export const load: PageServerLoad = async () => {
	return {
		mentionsLegales
	};
};
