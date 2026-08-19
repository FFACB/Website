import dotenv from 'dotenv';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { logger } from '../../modules/server/logs/index.js';
import PartenairesJson from './partenaires.config.json' with { type: 'json' };
import { prisma } from '../../modules/server/database/index.js';
dotenv.config();

const { PUBLIC_UPLOADS_FOLDER_NAME } = process.env;

const LOGOS_FOLDER = 'conf/partenaires/logos';

// Valeurs par defaut de resolutionMax / quality100 (src/lib/client/assets/pictures) :
// ces classes sont en TypeScript derriere l'alias $lib, non importables depuis conf/.
const RESOLUTION_NAME = 'full';
const RESOLUTION_VALUE = null;
const QUALITY_NAME = '100';
const QUALITY_VALUE = 100;

/**
 *
 *
 * @description Initialisation des partenaires
 * @example initialize()
 * @returns {void}
 */

export async function initialize() {
	try {
		console.log('Initialisation des partenaires');
		logger.debug('Initialisation des partenaires');

		// Chaque partenaire ecrit son logo sur le disque via sharp : on enchaine les
		// creations sequentiellement pour que le process ne rende pas la main avant la fin.
		for (const _partenaire of PartenairesJson) {
			const partenaireFound = await partenaireGet(_partenaire.name);

			if (partenaireFound != null) {
				logger.debug(`Partenaire ${partenaireFound.name.trim()} deja existant, skipped`);
				continue;
			}

			const assetCree = await assetCreate(_partenaire.logo);

			if (assetCree == null) {
				logger.error(`Logo ${_partenaire.logo} innexistant`);
				continue;
			}

			const pictureAssetCree = await pictureAssetCreate(assetCree);

			if (pictureAssetCree == null) {
				logger.error(`Picture asset du partenaire ${_partenaire.name} non cree`);
				continue;
			}

			const partenaireCree = await partenaireCreate(
				_partenaire.name,
				_partenaire.description,
				_partenaire.siteInternet,
				pictureAssetCree.id,
				_partenaire.ordre
			);

			if (partenaireCree == null) {
				throw new Error(`Erreur lors de la création du partenaire ${_partenaire.name}`);
			}
		}
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		process.exit(1);
	}
}

/**
 * @param {string} NAME
 *
 * @example partenaireGet('NAME')
 * @returns {Promise<{ id: string; name: string; description: string; siteInternet: string; pictureAssetId_Logo: string; ordre: number; } | null>}
 */

export async function partenaireGet(NAME) {
	try {
		let data = null;
		if (!NAME) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.partenaire.findFirst({
			where: {
				name: NAME
			}
		});
		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}

/**
 * @param {string} name
 * @param {string} description
 * @param {string} siteInternet
 * @param {string} pictureAssetIdLogo
 * @param {number} ordre
 *
 * @example partenaireCreate('NAME','description','https://site.fr/','PICTURE_ASSET_ID',0)
 * @returns {Promise<{ id: string; name: string; description: string; siteInternet: string; pictureAssetId_Logo: string; ordre: number; } | null>}
 */

export async function partenaireCreate(
	name,
	description,
	siteInternet,
	pictureAssetIdLogo,
	ordre
) {
	try {
		let data = null;

		if (!name) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.partenaire.create({
			data: {
				name: name,
				description: description ?? '',
				siteInternet: siteInternet ?? '',
				pictureAssetId_Logo: pictureAssetIdLogo ?? '',
				ordre: ordre ?? 0
			}
		});

		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}

/**
 * @description Enregistre un logo du dossier conf/partenaires/logos en Asset, comme le fait
 * saveAssetUpload ($lib/server/assets/asset-upload) pour un fichier televerse depuis l'admin
 *
 * @param {string} LOGOFILENAME
 *
 * @example assetCreate('AQC.jpg')
 * @returns {Promise<{ id: string; path: string; filename: string; extension: string; originalFilename: string; } | null>}
 */

export async function assetCreate(LOGOFILENAME) {
	try {
		if (!LOGOFILENAME) {
			throw new Error('Parametre LOGOFILENAME manquant');
		}

		const logoPath = `${LOGOS_FOLDER}/${LOGOFILENAME}`;

		if (!existsSync(logoPath)) {
			throw new Error(`Le logo ${logoPath} n'existe pas`);
		}

		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/assets/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath, { recursive: true });
		}

		const arrayBuffer = readFileSync(logoPath);
		const filename = `${uuid()}`;
		let extension = 'webp';

		if (LOGOFILENAME.split('.').pop().toLowerCase() === 'svg') {
			extension = 'svg';
			writeFileSync(`${filepath}${filename}.${extension}`, Buffer.from(arrayBuffer));
		} else {
			await sharp(arrayBuffer)
				.resize(null, null, {
					fit: 'inside', // 'inside' ensures that the image is not upscaled
					withoutEnlargement: true // Prevent enlargement of smaller images
				})
				.toFormat('webp')
				.toFile(`${filepath}${filename}.${extension}`);
		}

		const data = await prisma.asset.create({
			data: {
				path: `/${filepath}${filename}.${extension}`,
				extension: extension,
				filename: filename,
				originalFilename: LOGOFILENAME,
				assetCategory: {
					connect: {
						name: 'PICTURE'
					}
				}
			}
		});

		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}

/**
 * @description Declinaison d'un Asset en PictureAsset, comme le fait savePictureAsset
 * ($lib/server/assets/picture/picture-asset-upload), en resolution et qualite maximales
 *
 * @param {{ id: string; path: string; extension: string; }} ASSET
 *
 * @example pictureAssetCreate(asset)
 * @returns {Promise<{ id: string; path: string; quality: number; resolution: number | null; assetId: string; } | null>}
 */

export async function pictureAssetCreate(ASSET) {
	try {
		if (!ASSET) {
			throw new Error('Parametre ASSET manquant');
		}

		const arrayBuffer = readFileSync(`${ASSET.path.slice(1)}`);
		const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/assets/${RESOLUTION_NAME}/${QUALITY_NAME}/`;

		if (!existsSync(filepath)) {
			mkdirSync(filepath, { recursive: true });
		}

		let filename = `${ASSET.id}`;

		if (ASSET.extension !== 'svg') {
			filename += '.webp';

			await sharp(arrayBuffer)
				.resize(RESOLUTION_VALUE, RESOLUTION_VALUE, {
					fit: 'inside',
					withoutEnlargement: true
				})
				.webp({ quality: QUALITY_VALUE })
				.toFile(`${filepath}${filename}`);
		} else {
			filename += '.svg';
			writeFileSync(`${filepath}${filename}`, Buffer.from(arrayBuffer));
		}

		const data = await prisma.pictureAsset.create({
			data: {
				quality: QUALITY_VALUE,
				resolution: RESOLUTION_VALUE,
				path: `/${filepath}${filename}`,
				asset: {
					connect: {
						id: ASSET.id
					}
				}
			}
		});

		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}
