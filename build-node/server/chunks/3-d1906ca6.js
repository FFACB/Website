import { a as auth } from './lucia-4a1e7f26.js';
import { r as redirect } from './index-0087e825.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const load = async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw redirect(301, "/admin/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ed4fc3f3.js')).default;
const server_id = "src/routes/(admin)/admin/(back)/home/+page.server.ts";
const imports = ["_app/immutable/nodes/3.0ebf94d1.js","_app/immutable/chunks/disclose-version.ba38736e.js","_app/immutable/chunks/runtime.b23a58cc.js"];
const stylesheets = ["_app/immutable/assets/2.4b085d43.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-d1906ca6.js.map
