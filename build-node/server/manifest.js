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
		client: {"start":"_app/immutable/entry/start.5f952dfb.js","app":"_app/immutable/entry/app.d873d83c.js","imports":["_app/immutable/entry/start.5f952dfb.js","_app/immutable/chunks/scheduler.aa555894.js","_app/immutable/chunks/singletons.d80b9a2e.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.d873d83c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.aa555894.js","_app/immutable/chunks/index.571fe745.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-c256c781.js')),
			__memo(() => import('./chunks/1-8f9040c9.js')),
			__memo(() => import('./chunks/2-541de34e.js')),
			__memo(() => import('./chunks/3-c02d76f4.js')),
			__memo(() => import('./chunks/4-f45412d8.js')),
			__memo(() => import('./chunks/5-08028a3a.js')),
			__memo(() => import('./chunks/6-e80d06e6.js')),
			__memo(() => import('./chunks/7-2c466720.js')),
			__memo(() => import('./chunks/8-609e856b.js')),
			__memo(() => import('./chunks/9-34d638ae.js')),
			__memo(() => import('./chunks/10-b79b1800.js')),
			__memo(() => import('./chunks/11-b408e7a9.js')),
			__memo(() => import('./chunks/12-8483846c.js'))
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
