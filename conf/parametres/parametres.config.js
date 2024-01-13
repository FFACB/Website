// initScriptPlugin.ts
import { lucia } from 'lucia';
import * as adapter from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';
import ParametresJson from './parametres.config.json';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
export { prisma };

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			try {
				ParametresJson.forEach(async (_parametre) => {
					const { key, label, default_value, env_key } = _parametre;

					const parametreFound = await prisma.parametre.findUnique({
						where: {
							key
						}
					});

					if (parametreFound != null) {
						console.log(`Parametre \x1b[32m${parametreFound.key}\x1b[0m déjà existant, skipped`);
						return;
					}

					let initialValue = process.env[env_key] ?? default_value;

					const parametreCree = await prisma.parametre.create({
						data: {
							key,
							label,
							value: initialValue
						}
					});

					console.log(`Parametre \x1b[32m${parametreCree.key}\x1b[0m à été crée`);
				});
			} catch (err) {
				console.log('\x1b[31m%s\x1b[0m', err);
			}
		}
	};
};
