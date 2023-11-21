import { a as auth } from './lucia-4a1e7f26.js';
import { r as redirect, f as fail } from './index-0087e825.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const load = async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    throw redirect(302, "/admin/home");
  }
  return {};
};
const actions = {
  login: async ({ request, params, locals, cookies }) => {
    const data = Object.fromEntries(await request.formData());
    const { email, password } = data;
    if (email == null || typeof email !== "string" || email.length < 1) {
      return fail(400, {
        data,
        errorMsg: "Mail incorrect"
      });
    }
    if (password == null || typeof password !== "string" || password.length < 1) {
      return fail(400, {
        data,
        errorMsg: "Mot de passe incorrect"
      });
    }
    try {
      let key = await auth.useKey("email", email, password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
        // expects `Lucia.DatabaseSessionAttributes`
      });
      locals.auth.setSession(session);
    } catch (err) {
      return fail(400, {
        data,
        errorMsg: "Identifiants incorrects"
      });
    }
    return {
      data,
      errorMsg: void 0
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-a737d389.js')).default;
const server_id = "src/routes/(admin)/admin/login/+page.server.ts";
const imports = ["_app/immutable/nodes/6.04d02af3.js","_app/immutable/chunks/scheduler.ac6ecc1c.js","_app/immutable/chunks/index.6bb7e777.js","_app/immutable/chunks/forms.afac144b.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.d831195b.js","_app/immutable/chunks/index.b95c7ae7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-72f0d9dd.js.map
