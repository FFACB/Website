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
		client: {"start":"_app/immutable/entry/start.1d9095b2.js","app":"_app/immutable/entry/app.3ea0ac64.js","imports":["_app/immutable/entry/start.1d9095b2.js","_app/immutable/chunks/scheduler.17937e75.js","_app/immutable/chunks/singletons.5c8479d8.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.3ea0ac64.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.17937e75.js","_app/immutable/chunks/index.10b7684d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-5879425e.js')),
			__memo(() => import('./chunks/1-b2898420.js')),
			__memo(() => import('./chunks/2-daffd354.js')),
			__memo(() => import('./chunks/3-d0ae5618.js')),
			__memo(() => import('./chunks/4-7d1682a0.js')),
			__memo(() => import('./chunks/5-879a16f3.js')),
			__memo(() => import('./chunks/6-f5b501ea.js')),
			__memo(() => import('./chunks/7-92a3653f.js')),
			__memo(() => import('./chunks/8-91b1bcff.js')),
			__memo(() => import('./chunks/9-475604a2.js')),
			__memo(() => import('./chunks/10-04eeb050.js')),
			__memo(() => import('./chunks/11-c492d8a9.js')),
			__memo(() => import('./chunks/12-3a09719b.js'))
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
