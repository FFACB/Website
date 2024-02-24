import dotenv from 'dotenv';
import ParametresJson from './parametres.config.json';
import { logger } from '../../modules/server/logs';
import { prisma } from '../../modules/server/database';
dotenv.config();

/**
 *
 * @example initialize()
 * @returns {void}
 */

export function initialize() {
	try {
		console.log('Initialisation des parametres');
		logger.debug('Initialisation des parametres');

		ParametresJson.forEach(async (_parametre) => {
			const { key, label, default_value, env_key } = _parametre;

			const parametreFound = await get(key);

			if (parametreFound != null) {
				logger.debug(`Parametre ${parametreFound.key} deja existant, skipped`);
				return;
			}

			let initialValue = process.env[env_key] ?? default_value;
			const parametreCree = await create(key, label, initialValue);

			if (parametreCree == null) {
				throw new Error(`Erreur lors de la création du parametre ${key}`);
				
			}

			logger.debug(`Parametre ${parametreCree.key} cree avec succes`);
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		process.exit(1);
	}
}

/**
 * @param {string} KEY
 * @param {string} LABEL
 * @param {string} VALUE
 *
 * @example create('KEY','label description','VALUE')
 * @returns {Promise<{ key: string; label: string; value: string; } | null>}
 */

export async function create(KEY, LABEL, VALUE) {
	let data = null;

	try {
		if (!KEY) {
			throw new Error('Parametre KEY manquant');
		}

		if (!LABEL) {
			throw new Error('Parametre LABEL manquant');
		}


		data = await prisma.parametre.create({
			data: {
				key: KEY,
				label: LABEL,
				value: VALUE
			}
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);

	} finally {
		return data;
	}
}

/**
 * @param {string} KEY
 *
 * @example get('KEY')
 * @returns {Promise<{ key: string; label: string; value: string; } | null>}
 */

export async function get(KEY) {
	let data = null;
	try {
		if (!KEY) {
			throw new Error('Parametre KEY manquant');
		}

		data = await prisma.parametre.findUnique({
			where: {
				key: KEY
			}
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);

	} finally {
		return data;
	}
}
