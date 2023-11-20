import { t as create_anchor, u as slot, k as pop, g as push } from './index-85734922.js';

function Layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}`;
  pop();
}

export { Layout as default };
//# sourceMappingURL=layout.svelte-fa247286.js.map
