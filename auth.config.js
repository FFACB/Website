// initScriptPlugin.ts
import { lucia } from "lucia";
import * as adapter from "@lucia-auth/adapter-prisma";
import { sveltekit } from "lucia/middleware";
import { PrismaClient } from "@prisma/client"
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_ADMIN_EMAIL, SECRET_ADMIN_PASSWORD } = process.env;

if(SECRET_ADMIN_EMAIL == null || SECRET_ADMIN_PASSWORD == null){
    throw new Error("SECRET_ADMIN_EMAIL or SECRET_ADMIN_PASSWORD is not defined")
}


const prisma = new PrismaClient()
export { prisma }

export default () => {
	return {
		name: 'run-init-script',
		async buildStart() {
			try {
				const auth = lucia({
					adapter: adapter.prisma(prisma),
					middleware: sveltekit(),
					env:  'DEV' ,
					getUserAttributes: (data) => {
						return {
							email: data.email
						};
					}
				});

				await auth.createUser({
					key: {
						providerId: 'email',
						providerUserId: SECRET_ADMIN_EMAIL,
						password: SECRET_ADMIN_PASSWORD
					},
					attributes: {
						email: SECRET_ADMIN_EMAIL
					}
				});
			} catch (err) {
				console.log("Admin user already exists")
			}
		}
	};
};
