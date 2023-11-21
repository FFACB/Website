import { g as push, t as create_anchor, k as pop } from './index2-85734922.js';

function _page($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<form method="POST" action="?/login"><div class="form-group"><label for="email">Email</label> <input id="email" name="email" type="text"></div> <div class="form-group"><label for="password">Password</label> <input id="password" name="password" type="text"></div> ${anchor}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <button type="submit" value="login" class="submit-button">Connexion</button></form>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-41908fdc.js.map
