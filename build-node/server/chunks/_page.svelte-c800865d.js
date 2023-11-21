import { g as push, v as escape, j as bind_props, k as pop } from './index2-c72fb9c6.js';

function _page($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  const { user } = data;
  debugger;
  $$payload.out += `<div>${escape(user)}</div>`;
  bind_props($$props, { data });
  pop();
}
_page.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes for more information");
};

export { _page as default };
//# sourceMappingURL=_page.svelte-c800865d.js.map
