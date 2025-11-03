import dotenv from 'dotenv';
import { logger } from '../../modules/server/logs/index.js';
import RegionsJson from './regions.config.json' with { type: 'json' };
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

		Object.keys(RegionsJson).forEach(async (_region) => {
			const cooperativeFound = await get(_region);

			if (cooperativeFound != null) {
				logger.debug(`Cooperative ${cooperativeFound.name.trim()} deja existant, skipped`);
				return;
			}

			const cooperativeCree = await create(_region);

			if (cooperativeCree == null) {
				throw new Error(`Erreur lors de la création du cooperative ${_region}`);
			}

			logger.debug(`Parametre ${cooperativeCree.name.trim()} cree avec succes`);
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
 * @example create('NAME','label description','VALUE')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null; } | null>}
 */

export async function create(NAME) {
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
 * @example get('NAME')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null } | null>}
 */

export async function get(NAME) {
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
