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

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-41908fdc.js')).default;
const server_id = "src/routes/(admin)/admin/login/+page.server.ts";
const imports = ["_app/immutable/nodes/4.a7c52b51.js","_app/immutable/chunks/disclose-version.ba38736e.js","_app/immutable/chunks/runtime.b23a58cc.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.b850a235.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-cc760ec9.js.map
