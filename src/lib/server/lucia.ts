import { lucia } from "lucia";
import * as adapter from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prisma } from "$lib/server/prisma";
import { sveltekit } from "lucia/middleware";


export const auth = lucia({

    adapter: adapter.prisma(prisma),
    middleware: sveltekit(),
    env: dev ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			email: data.email
		};
	},
    
    
})

export type Auth = typeof auth;