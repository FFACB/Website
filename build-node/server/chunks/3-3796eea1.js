import { a as auth } from './lucia-3998f6ef.js';
import { e as error } from './index-2b68e648.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const load = async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw error(401, "Unauthorized");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-dae0bb82.js')).default;
const server_id = "src/routes/(back)/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/3.c63ade32.js","_app/immutable/chunks/disclose-version.ac9f713d.js","_app/immutable/chunks/runtime.bbe7a613.js"];
const stylesheets = ["_app/immutable/assets/2.4b085d43.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-3796eea1.js.map
