import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { logger } from '../../modules/server/logs/index.js';
import { prisma } from '../../modules/server/database/index.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_ADMIN_EMAIL, SECRET_ADMIN_PASSWORD, NODE_ENV } = process.env;

/**
 * @description Initialisation de l'authentification administrateur

 * @example initialize('DEV','admin','admin123')
 * @returns {Promise<void>}
 */

export async function initialize() {
	try {
		console.log('Initialisation authentification');
		logger.debug('Initialisation authentification');

		if (
			typeof SECRET_ADMIN_EMAIL !== 'string' ||
			typeof SECRET_ADMIN_PASSWORD !== 'string' ||
			typeof NODE_ENV !== 'string'
		) {
			logger.fatal("Variables d'environement manquantes");
			process.exit(1);
		}

		const adapter = new PrismaAdapter(prisma.session, prisma.user);
		new Lucia(adapter, {
			sessionCookie: {
				attributes: {
					secure: NODE_ENV == 'PROD'
				}
			},

			//@ts-expect-error: send username
			getUserAttributes: ({ username }) => {
				return {
					username
				};
			}
		});

		await prisma.user.create({
			data: {
				username: SECRET_ADMIN_EMAIL,
				password: SECRET_ADMIN_PASSWORD
			}
		});
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code == 'P2002')
			logger.debug('Super Admin existant, skipped');
		else logger.error(err);
	}
}
