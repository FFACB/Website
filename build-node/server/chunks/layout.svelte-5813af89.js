import { t as create_anchor, u as slot, k as pop, g as push } from './index2-c72fb9c6.js';

function Layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}`;
  pop();
}
Layout.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes for more information");
};

export { Layout as default };
//# sourceMappingURL=layout.svelte-5813af89.js.map
