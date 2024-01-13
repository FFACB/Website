const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","main.scss","styles/base.scss","styles/reset.scss"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.de055241.js","app":"_app/immutable/entry/app.b6ff751c.js","imports":["_app/immutable/entry/start.de055241.js","_app/immutable/chunks/scheduler.17937e75.js","_app/immutable/chunks/singletons.112fed4d.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.b6ff751c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.17937e75.js","_app/immutable/chunks/index.10b7684d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-5879425e.js')),
			__memo(() => import('./chunks/1-6e22a208.js')),
			__memo(() => import('./chunks/2-46cc40b1.js')),
			__memo(() => import('./chunks/3-9af41bf0.js')),
			__memo(() => import('./chunks/4-becbe8ce.js')),
			__memo(() => import('./chunks/5-37706cef.js')),
			__memo(() => import('./chunks/6-fbd1c5e6.js')),
			__memo(() => import('./chunks/7-7c0ec37c.js')),
			__memo(() => import('./chunks/8-8a088d88.js')),
			__memo(() => import('./chunks/9-d9c273c9.js')),
			__memo(() => import('./chunks/10-eef60220.js')),
			__memo(() => import('./chunks/11-4fe487da.js')),
			__memo(() => import('./chunks/12-be823ffc.js'))
		],
		routes: [
			{
				id: "/(front)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/(actualite)/actualites",
				pattern: /^\/admin\/actualites\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/(actualite)/actualite/[[idActualite]]",
				pattern: /^\/admin\/actualite(?:\/([^/]+))?\/?$/,
				params: [{"name":"idActualite","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/(formulaire)/(contact)/contacts",
				pattern: /^\/admin\/contacts\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/(formulaire)/(contact)/contact/[id]",
				pattern: /^\/admin\/contact\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/home",
				pattern: /^\/admin\/home\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-61623d3d.js'))
			},
			{
				id: "/(admin)/admin/(back)/(parametre)/parametres",
				pattern: /^\/admin\/parametres\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(api)/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-22e858e6.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
