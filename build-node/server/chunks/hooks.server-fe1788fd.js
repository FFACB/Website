import { a as auth } from './lucia-3998f6ef.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const handle = async (serverEvent) => {
  const { resolve, event } = serverEvent;
  const { locals } = event;
  locals.auth = auth.handleRequest(event);
  return await resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-fe1788fd.js.map
