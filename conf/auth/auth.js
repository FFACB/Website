import { Lucia } from 'lucia';

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
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
		const adapter = new PrismaAdapter(prisma.session, prisma.user);
		const lucia = new Lucia(adapter,{
			sessionCookie: {
				attributes: {
					secure: environement == 'PROD',
				}
			},
			// @ts-ignore
			getUserAttributes: ({username}) => {
				return {
					username
				};
			}
		});

	    let user = await prisma.user.create({
			data: {
				username: adminEmail,
				password: adminPassword
			}
		});

	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code == 'P2002')
			logger.debug('Super Admin existant, skipped');
		else logger.error(err);
	}
}
