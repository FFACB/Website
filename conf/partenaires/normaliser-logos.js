import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { basename, extname } from 'path';
import sharp from 'sharp';

// Script de maintenance, lance a la main : node conf/partenaires/normaliser-logos.js
// Il ne fait pas partie du build et ne touche ni la base ni initialize().
//
// Les logos fournis par les partenaires ont des marges vides tres variables (Legrand : 28% de
// hauteur utile, LUABS : 27%, Qualibat : 100%). Avec un rendu en hauteur fixe, la taille apparente
// ne depend donc que du ratio du fichier, marges comprises, d'ou des logos deux a trois fois plus
// petits que les autres. On detoure chaque logo puis on le redimensionne a surface constante avant
// de le poser sur un canevas identique pour tous.

const DOSSIER_LOGOS = 'conf/partenaires/logos';

const CANEVAS_L = 600;
const CANEVAS_H = 240;

// Surface visuelle cible en pixels du canevas. Un logo carre et une signature tres large occupent
// ainsi la meme "quantite d'encre", ce qu'une simple hauteur commune ne donne pas.
const SURFACE_CIBLE = 60000;

// Les sources les plus petites seraient trop floues au dela : on prefere un logo legerement plus
// petit qu'un logo interpole.
const AGRANDISSEMENT_MAX = 2;

// Seuil de detourage : tolere le bruit de compression des JPEG sur fond blanc.
const SEUIL_DETOURAGE = 12;

/**
 * @description Detoure un logo, le met a l'echelle a surface constante et le centre sur un canevas
 * commun. Ecrit le resultat en PNG transparent a cote de la source.
 *
 * @param {string} FICHIER
 *
 * @example normaliser('LEGRAND.png')
 * @returns {Promise<void>}
 */

async function normaliser(FICHIER) {
	const chemin = `${DOSSIER_LOGOS}/${FICHIER}`;
	const nom = basename(FICHIER, extname(FICHIER));
	const destination = `${DOSSIER_LOGOS}/${nom}.png`;

	const source = await sharp(chemin).metadata();

	// Le detourage echoue sur une image entierement uniforme : on retombe sur la source telle quelle.
	let detoure = null;

	try {
		detoure = await sharp(chemin)
			.trim({ threshold: SEUIL_DETOURAGE })
			.png()
			.toBuffer({ resolveWithObject: true });
	} catch {
		detoure = await sharp(chemin).png().toBuffer({ resolveWithObject: true });
	}

	const largeurUtile = detoure.info.width;
	const hauteurUtile = detoure.info.height;

	const echelle = Math.min(
		Math.sqrt(SURFACE_CIBLE / (largeurUtile * hauteurUtile)),
		CANEVAS_L / largeurUtile,
		CANEVAS_H / hauteurUtile,
		AGRANDISSEMENT_MAX
	);

	const largeurFinale = Math.max(1, Math.round(largeurUtile * echelle));
	const hauteurFinale = Math.max(1, Math.round(hauteurUtile * echelle));

	const image = await sharp(detoure.data)
		.resize(largeurFinale, hauteurFinale, { fit: 'fill' })
		.extend({
			top: Math.floor((CANEVAS_H - hauteurFinale) / 2),
			bottom: Math.ceil((CANEVAS_H - hauteurFinale) / 2),
			left: Math.floor((CANEVAS_L - largeurFinale) / 2),
			right: Math.ceil((CANEVAS_L - largeurFinale) / 2),
			background: { r: 0, g: 0, b: 0, alpha: 0 }
		})
		.png()
		.toBuffer();

	writeFileSync(destination, image);

	const alerte = echelle > 1 ? ` /!\\ source agrandie x${echelle.toFixed(2)}` : '';

	console.log(
		`${FICHIER} : ${source.width}x${source.height} -> utile ${largeurUtile}x${hauteurUtile} -> rendu ${largeurFinale}x${hauteurFinale} sur ${CANEVAS_L}x${CANEVAS_H}${alerte}`
	);

	return {
		fichier: FICHIER,
		destination: `${nom}.png`,
		largeurFinale,
		hauteurFinale,
		agrandie: echelle > 1
	};
}

/**
 * @description Ecrit une planche de controle HTML pour relire les 15 logos avant de committer.
 *
 * @param {{ destination: string; largeurFinale: number; hauteurFinale: number; agrandie: boolean; }[]} RESULTATS
 * @param {string} DESTINATION
 *
 * @example planche(resultats, 'planche.html')
 * @returns {void}
 */

function planche(RESULTATS, DESTINATION) {
	const cartes = RESULTATS.map(
		(resultat) => `<figure class="carte${resultat.agrandie ? ' alerte' : ''}">
			<div class="boite"><img src="logos/${encodeURIComponent(resultat.destination)}" alt="" /></div>
			<figcaption>${resultat.destination}<br /><small>${resultat.largeurFinale}x${resultat.hauteurFinale}</small></figcaption>
		</figure>`
	).join('\n');

	writeFileSync(
		DESTINATION,
		`<!doctype html>
<html lang="fr">
<head><meta charset="utf-8" /><title>Planche de controle des logos partenaires</title>
<style>
	body { font-family: system-ui, sans-serif; background: #f4f4f5; margin: 0; padding: 32px; }
	h1 { font-size: 18px; }
	.grille { display: flex; flex-wrap: wrap; gap: 24px; background: #fff; padding: 24px; }
	.carte { margin: 0; text-align: center; }
	.boite { width: 200px; height: 80px; display: flex; align-items: center; justify-content: center; outline: 1px dashed #d4d4d8; }
	.boite img { max-width: 100%; max-height: 100%; object-fit: contain; }
	.carte.alerte .boite { outline-color: #dc2626; }
	figcaption { font-size: 11px; color: #52525b; margin-top: 8px; }
</style>
</head>
<body>
	<h1>Logos normalises &mdash; boite de rendu 200x80, contour rouge = source agrandie</h1>
	<div class="grille">
${cartes}
	</div>
</body>
</html>`
	);
}

/**
 * @description Normalise tous les logos du dossier.
 *
 * @example normaliserTous()
 * @returns {Promise<void>}
 */

async function normaliserTous() {
	if (!existsSync(DOSSIER_LOGOS)) {
		console.error(`Dossier ${DOSSIER_LOGOS} introuvable : lancer le script depuis Website/`);
		process.exit(1);
	}

	const fichiers = readdirSync(DOSSIER_LOGOS).filter((fichier) =>
		['.jpg', '.jpeg', '.png', '.webp'].includes(extname(fichier).toLowerCase())
	);

	const resultats = [];

	for (const fichier of fichiers) {
		resultats.push(await normaliser(fichier));
	}

	const dossierPlanche = 'conf/partenaires';

	if (!existsSync(dossierPlanche)) {
		mkdirSync(dossierPlanche, { recursive: true });
	}

	planche(resultats, `${dossierPlanche}/planche-logos.html`);

	console.log(`\n${resultats.length} logos normalises.`);
	console.log(`Planche de controle : ${dossierPlanche}/planche-logos.html`);
}

normaliserTous();
