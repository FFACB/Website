import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ParametresJson from './parametres.config.json';

dotenv.config();
const prisma = new PrismaClient();

export function initialize() {
	try {
		ParametresJson.forEach(async (_parametre) => {
			const { key, label, default_value, env_key } = _parametre;

			const parametreFound = await get(key);

			if (parametreFound != null) {
				console.log(`Parametre \x1b[32m${parametreFound.key}\x1b[0m déjà existant, skipped`);
				return;
			}

			let initialValue = process.env[env_key] ?? default_value;

			const parametreCree = await create(key, label, initialValue);

			console.log(`Parametre \x1b[32m${parametreCree?.key}\x1b[0m à été crée`);
		});
	} catch (err) {
		console.log('\x1b[31m%s\x1b[0m', err);
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
	try {
		if (!KEY || !LABEL || !VALUE) {
			throw new Error('Paramètre manquant');
		}

		return await prisma.parametre
			.create({
				data: {
					key: KEY,
					label: LABEL,
					value: VALUE
				}
			})
			.then((parametre) => {
				return parametre;
			});
	} catch (err) {
		console.log('\x1b[31m%s\x1b[0m', err);
		return null;
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
			throw new Error('Paramètre KEY manquant');
		}

		data = await prisma.parametre.findUnique({
			where: {
				key: KEY
			}
		});

	} catch (err) {
		console.log('\x1b[31m%s\x1b[0m', err);
		data = null;

	}finally{
        return data;
    }
}
