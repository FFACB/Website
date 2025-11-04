import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
	let __prisma: PrismaClient;

	/// <reference types="lucia-auth" />
	export type DatabaseUser = {
		id: string;
		username: string;
		password: string;
	};

	export type Picture = {
		id: string;
		path: string;
		createdAt: Date;
	};

	export type CooperativeFull = {
		cooperativeRegion: {
			id: string;
			name: string;
			createdAt: Date;
		};
	} & {
		id: string;
		name: string;
		createdAt: Date;
		cooperativeRegionId: string;
		siren: string;
		adresse: string;
		infoComplementaire: string;
		cp: number;
		ville: string;
		siteInternet: string;
		adresseMail: string;
		telephone: string;
		contact1Nom: string;
		contact1telephone: string;
		contact1Email: string;
		contact2Nom: string;
		contact2telephone: string;
		contact2Email: string;
		latitude: string;
		longitude: string;
	};
}

export {};
