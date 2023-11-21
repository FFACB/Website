import { p as prisma } from './lucia-3998f6ef.js';
import './index-2b68e648.js';
import 'lucia';
import '@lucia-auth/adapter-prisma';
import '@prisma/client';
import 'lucia/middleware';

const load = async ({ params }) => {
  const user = await prisma.user.findFirst({});
  return {
    user
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-c800865d.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.7e407a3d.js","_app/immutable/chunks/disclose-version.ac9f713d.js","_app/immutable/chunks/runtime.bbe7a613.js"];
const stylesheets = ["_app/immutable/assets/2.4b085d43.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-edce59ae.js.map
