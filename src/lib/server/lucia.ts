import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { webcrypto } from 'node:crypto';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: true
		}
	},
	// @ts-ignore
	getUserAttributes: ({username}) => {
		return {
			username
		};
	}
});

