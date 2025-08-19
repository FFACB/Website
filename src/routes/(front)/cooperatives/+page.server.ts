import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';

export const prerender = 'auto';

export const load: PageServerLoad = async () => {
	const PUBLIC_GOOGLE_API_KEY = await getParametre('PUBLIC_GOOGLE_API_KEY');

	//TODO: remove this when the PUBLIC_GOOGLE_API_KEY is set
	if (PUBLIC_GOOGLE_API_KEY.value == '') {
		PUBLIC_GOOGLE_API_KEY.value = 'AIzaSyC6Fo0GTT8_dDz2zbHkxPhUgniP_HjknB8';
	}

	return {
		parametres: {
			PUBLIC_GOOGLE_API_KEY
		},
		cooperatives: getDummyCooperatives()
	};
};

function getDummyCooperatives() {
	return [
		{
			id: '0b8ddc5e-fd9a-4595-b113-0bd4c099ec19',
			region: 'Centre-Val de Loire',
			name: 'Coopérative Tours 22',
			address: '68 rue de Tours',
			cp: '44378',
			ville: 'Tours',
			phone: '01 80 78 16 14',
			email: 'contact-tours@coop.coop',
			lat: 49.008912,
			lng: 7.996065,
			url: '/cooperatives/ef3f18a2-7f2a-43bc-9e8e-6894294750a0'
		},
		{
			id: 'cab48503-174b-426b-9fb6-e9117abf4dc6',
			region: 'Nouvelle-Aquitaine',
			name: 'Coopérative Pau 56',
			address: '58 rue de Pau',
			cp: '80389',
			ville: 'Pau',
			phone: '05 20 17 88 38',
			email: 'contact-pau@coop.coop',
			lat: 49.833206,
			lng: 5.362674,
			url: '/cooperatives/b3014644-dc2d-49e5-a165-68a10f0925e4'
		},
		{
			id: '240678c5-8306-4530-ab9b-f5fab42fea09',
			region: 'Grand Est',
			name: 'Coopérative Strasbourg 97',
			address: '82 rue de Strasbourg',
			cp: '12136',
			ville: 'Strasbourg',
			phone: '05 64 61 44 45',
			email: 'contact-strasbourg@coop.coop',
			lat: 44.359912,
			lng: 6.806011,
			url: '/cooperatives/53b4d445-e6b0-4dea-9af1-47191afd3b14'
		},
		{
			id: 'a2ebd418-fd67-4be4-b35b-9c5acf7b1ed7',
			region: 'Nouvelle-Aquitaine',
			name: 'Coopérative Pau 25',
			address: '30 rue de Pau',
			cp: '12737',
			ville: 'Pau',
			phone: '06 90 88 38 94',
			email: 'contact-pau@coop.coop',
			lat: 42.365924,
			lng: -3.345344,
			url: '/cooperatives/b35939c3-c26b-42b4-bb12-78908bb39ef4'
		},
		{
			id: '06324d52-41ef-45de-a4c6-fdd6ed6347e8',
			region: 'Île-de-France',
			name: 'Coopérative Versailles 3',
			address: '27 rue de Versailles',
			cp: '30875',
			ville: 'Versailles',
			phone: '02 78 14 11 49',
			email: 'contact-versailles@coop.coop',
			lat: 49.791201,
			lng: 4.7878,
			url: '/cooperatives/216f9c3b-8c86-46be-8c5e-f702cf8f348c'
		},
		{
			id: '186f8237-1672-4314-95eb-01ee6f5a225d',
			region: 'Nouvelle-Aquitaine',
			name: 'Coopérative Bordeaux 97',
			address: '51 rue de Bordeaux',
			cp: '16108',
			ville: 'Bordeaux',
			phone: '01 97 64 22 87',
			email: 'contact-bordeaux@coop.coop',
			lat: 48.833206,
			lng: 2.362674,
			url: '/cooperatives/216f9c3b-8c86-46be-8c5e-f702cf8f348c'
		},
		{
			id: '71801978-656d-4362-985d-079002255577',
			region: "Provence-Alpes-Côte d'Azur",
			name: 'Coopérative Toulon 55',
			address: '35 rue de Toulon',
			cp: '13000',
			ville: 'Toulon',
			phone: '04 94 12 34 56',
			email: 'contact-toulon@coop.coop',
			lat: 43.125485,
			lng: 5.930833,
			url: '/cooperatives/71801978-656d-4362-985d-079002255577'
		},
		{
			id: '4050457d-4742-4721-8f75-232992557335',
			region: 'Bourgogne-Franche-Comté',
			name: 'Coopérative Dijon 12',
			address: '12 rue de Dijon',
			cp: '21000',
			ville: 'Dijon',
			phone: '03 80 12 34 56',
			email: 'contact-dijon@coop.coop',
			lat: 47.322047,
			lng: 5.04148,
			url: '/cooperatives/4050457d-4742-4721-8f75-232992557335'
		},
		{
			id: '5895492d-728d-424a-875d-959338757335',
			region: 'Hauts-de-France',
			name: 'Coopérative Lille 45',
			address: '45 rue de Lille',
			cp: '59000',
			ville: 'Lille',
			phone: '03 20 12 34 56',
			email: 'contact-lille@coop.coop',
			lat: 50.62925,
			lng: 3.057256,
			url: '/cooperatives/5895492d-728d-424a-875d-959338757335'
		},
		{
			id: 'fc326c1e-1d4f-47ef-aaeb-3cc312cc376d',
			region: 'Centre-Val de Loire',
			name: 'Coopérative Châteauroux 15',
			address: '15 rue de Châteauroux',
			cp: '77097',
			ville: 'Châteauroux',
			phone: '08 74 33 18 48',
			email: 'contact-châteauroux@coop.coop',
			lat: 50.70307,
			lng: -2.6512,
			url: '/cooperatives/fc326c1e-1d4f-47ef-aaeb-3cc312cc376d'
		},
		{
			id: '88a26cac-1064-4cef-949f-6f2e0d66b39b',
			region: 'Centre-Val de Loire',
			name: 'Coopérative Bourges 83',
			address: '38 rue de Bourges',
			cp: '73993',
			ville: 'Bourges',
			phone: '04 43 58 54 58',
			email: 'contact-bourges@coop.coop',
			lat: 43.24415,
			lng: 7.308363,
			url: '/cooperatives/67765031-0ce8-4c58-911b-7216c6be6bbc'
		},
		{
			id: '9d432008-cc68-48af-864e-e46d70912d1d',
			region: 'Hauts-de-France',
			name: 'Coopérative Tourcoing 1',
			address: '23 rue de Tourcoing',
			cp: '68078',
			ville: 'Tourcoing',
			phone: '08 42 84 65 16',
			email: 'contact-tourcoing@coop.coop',
			lat: 41.701191,
			lng: 7.07083,
			url: '/cooperatives/1364b2bc-590c-4156-af55-20c63d73700c'
		},
		{
			id: '31c85090-ef3d-4e53-a089-67d6e7677508',
			region: 'Bretagne',
			name: 'Coopérative Brest 98',
			address: '80 rue de Brest',
			cp: '50471',
			ville: 'Brest',
			phone: '02 48 72 21 79',
			email: 'contact-brest@coop.coop',
			lat: 47.385723,
			lng: 7.264075,
			url: '/cooperatives/a2d78d1d-c8ee-4c4d-865f-840fc4ca55d5'
		},
		{
			id: 'da12658a-2f85-4773-91df-ed2b48f12ac2',
			region: "Provence-Alpes-Côte d'Azur",
			name: 'Coopérative Nice 50',
			address: '60 rue de Nice',
			cp: '70340',
			ville: 'Nice',
			phone: '04 41 77 58 80',
			email: 'contact-nice@coop.coop',
			lat: 48.375188,
			lng: 3.554779,
			url: '/cooperatives/aa0eff4a-24c3-45a0-84c0-d4e4ff79ef4a'
		},
		{
			id: 'bf39fa4a-e77e-40c9-ad68-68f8d7bf46ce',
			region: 'Auvergne-Rhône-Alpes',
			name: 'Coopérative Annecy 12',
			address: '42 rue de Annecy',
			cp: '44604',
			ville: 'Annecy',
			phone: '08 20 84 71 22',
			email: 'contact-annecy@coop.coop',
			lat: 44.952486,
			lng: -2.95118,
			url: '/cooperatives/bdff733b-04af-4f19-a1cc-0d07f2342416'
		}
	];
}
