import dotenv from 'dotenv';
import { logger } from '../../modules/server/logs/index.js';
import RegionsJson from './regions.config.json' with { type: 'json' };
import CooperativesJson from './cooperatives.config.json' with { type: 'json' };
import { prisma } from '../../modules/server/database/index.js';
dotenv.config();

/**
 *
 *
 * @description Initialisation des cooperatives
 * @example initialize()
 * @returns {void}
 */

export function initialize() {
	try {
		console.log('Initialisation des cooperatives');
		logger.debug('Initialisation des cooperatives');

		RegionsJson.regions.forEach(async (_region) => {
			const cooperativeFound = await cooperativeRegionGet(_region.nom);

			if (cooperativeFound != null) {
				logger.debug(`Cooperative ${cooperativeFound.name.trim()} deja existant, skipped`);
				return;
			}

			const cooperativeCree = await cooperativeRegionCreate(_region.nom);

			if (cooperativeCree == null) {
				throw new Error(`Erreur lors de la création du cooperative ${_region.nom}`);
			}

			logger.debug(`Parametre ${cooperativeCree.name.trim()} cree avec succes`);
		});

		CooperativesJson.forEach(async (_cooperative) => {
			const cooperativeFound = await cooperativeGet(_cooperative.name);

			if (cooperativeFound != null) {
				logger.debug(`Coopérative ${cooperativeFound.name.trim()} deja existant, skipped`);
				return;
			}

			const cooperativeRegionFound = await cooperativeRegionGet(_cooperative.cooperativeRegionId);

			if (cooperativeRegionFound == null) {
				logger.error(`Cooperative region ${_cooperative.cooperativeRegionId} innexistant`);
				return;
			}

			const cooperativeCree = await cooperativeCreate(
				cooperativeRegionFound.id,
				_cooperative.name,
				_cooperative.siren,
				_cooperative.adresse,
				_cooperative.infoComplementaires,
				parseInt(_cooperative.cp),
				_cooperative.ville,
				_cooperative.siteInternet,
				_cooperative.telephone,
				_cooperative.adresseMail,
				_cooperative.contact1Nom,
				_cooperative.contact1Telephone,
				_cooperative.contact1Email,
				_cooperative.contact2Nom,
				_cooperative.contact2Telephone,
				_cooperative.contact2Email,
				_cooperative.latitude.toString(),
				_cooperative.longitude.toString()
			);

			if (cooperativeCree == null) {
				throw new Error(`Erreur lors de la création du cooperative ${_cooperative.name}`);
			}
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		process.exit(1);
	}
}

/**
 * @param {string} NAME
 *
 * @example cooperativeRegionCreate('NAME','label description','VALUE')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null; } | null>}
 */

export async function cooperativeRegionCreate(NAME) {
	try {
		let data = null;

		if (!NAME) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.cooperativeRegion.create({
			data: {
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
 * @param {string} NAME
 *
 * @example cooperativeRegionGet('NAME')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null } | null>}
 */

export async function cooperativeRegionGet(NAME) {
	try {
		let data = null;
		if (!NAME) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.cooperativeRegion.findUnique({
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
 * @param {string} NAME
 *
 * @example cooperativeCreate('NAME','label description','VALUE')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null; } | null>}
 */

export async function cooperativeCreate(
	cooperativeRegionId,
	name,
	siren,
	adresse,
	infoComplementaire,
	cp,
	ville,
	siteInternet,
	telephone,
	adresseMail,
	contact1Nom,
	contact1Telephone,
	contact1Email,
	contact2Nom,
	contact2Telephone,
	contact2Email,
	latitude,
	longitude
) {
	try {
		let data = null;

		if (!name) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.cooperative.create({
			data: {
				name: name,
				cooperativeRegion: {
					connect: {
						id: cooperativeRegionId
					}
				},
				siren: siren,
				adresse: adresse,
				infoComplementaire: infoComplementaire,
				cp: cp,
				ville: ville,
				siteInternet: siteInternet,
				telephone: telephone,
				adresseMail: adresseMail,
				contact1Nom: contact1Nom,
				contact1telephone: contact1Telephone,
				contact1Email: contact1Email,
				contact2Nom: contact2Nom,
				contact2telephone: contact2Telephone,
				contact2Email: contact2Email,
				latitude: latitude,
				longitude: longitude
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
 * @param {string} NAME
 *
 * @example cooperativeGet('NAME')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null } | null>}
 */

export async function cooperativeGet(NAME) {
	try {
		let data = null;
		if (!NAME) {
			throw new Error('Parametre NAME manquant');
		}

		data = await prisma.cooperative.findUnique({
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
