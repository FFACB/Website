import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient;

	/// <reference types="lucia-auth" />
	export interface DatabaseUser {
		id: string;
		username: string;
		password: string;
	}
}

export {};
