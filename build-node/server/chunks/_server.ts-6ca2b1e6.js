import { a as auth } from './lucia-4a1e7f26.js';
import { r as redirect } from './index-0087e825.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const POST = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
  }
  throw redirect(302, "/");
};

export { POST };
//# sourceMappingURL=_server.ts-6ca2b1e6.js.map
