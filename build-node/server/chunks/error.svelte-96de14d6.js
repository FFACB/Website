import { g as push, v as escape, w as store_get, x as unsubscribe_stores, k as pop } from './index-85734922.js';
import { g as getContext } from './main-client-565a94f2.js';

const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Error$1($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  $$payload.out += `<h1>${escape(store_get($$store_subs, "$page", page).status)}</h1> <p>${escape(store_get($$store_subs, "$page", page).error?.message)}</p>`;
  unsubscribe_stores($$store_subs);
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-96de14d6.js.map
