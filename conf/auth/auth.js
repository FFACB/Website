import { lucia } from 'lucia';
import 'lucia/polyfill/node';
import * as adapter from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';
import { logger } from '../../modules/server/logs';
import { prisma } from '../../modules/server/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * @param {string} environement
 * @param {string} adminEmail
 * @param {string} adminPassword
 *
 * @example initialize('DEV','admin','admin123')
 * @returns {Promise<void>}
 */

export async function initialize(environement, adminEmail, adminPassword) {
	try {
		const auth = lucia({
			adapter: adapter.prisma(prisma),
			middleware: sveltekit(),
			env: environement == 'PROD' ? 'PROD' : 'DEV',
			getUserAttributes: (data) => {
				return {
					email: data.email
				};
			}
		});

		await auth.createUser({
			key: {
				providerId: 'email',
				providerUserId: adminEmail,
				password: adminPassword
			},
			attributes: {
				email: adminEmail
			}
		});
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code == 'P2002')
			logger.debug('Super Admin existant, skipped');
		else logger.error(err);
	}
}
