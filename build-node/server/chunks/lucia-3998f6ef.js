import { lucia } from 'lucia';
import * as adapter from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { sveltekit } from 'lucia/middleware';

const prisma = new PrismaClient();
const auth = lucia({
  adapter: adapter.prisma(prisma),
  middleware: sveltekit(),
  env: "DEV",
  getUserAttributes: (data) => {
    return {
      email: data.email
    };
  }
});

export { auth as a, prisma as p };
//# sourceMappingURL=lucia-3998f6ef.js.map
