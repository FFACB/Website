const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/exper-bleu.png","main.scss","styles/base.scss","styles/reset.scss"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.86ea7e7f.js","app":"_app/immutable/entry/app.7d3f867a.js","imports":["_app/immutable/entry/start.86ea7e7f.js","_app/immutable/chunks/scheduler.dbe3b3e1.js","_app/immutable/chunks/singletons.5103e5bf.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.7d3f867a.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.dbe3b3e1.js","_app/immutable/chunks/index.29622050.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-6f203baf.js')),
			__memo(() => import('./chunks/1-f68cefa8.js')),
			__memo(() => import('./chunks/2-549f9cc3.js')),
			__memo(() => import('./chunks/3-c88fb0dc.js')),
			__memo(() => import('./chunks/4-395adcb6.js')),
			__memo(() => import('./chunks/5-6b851087.js')),
			__memo(() => import('./chunks/6-27b11532.js')),
			__memo(() => import('./chunks/7-69f38ed6.js')),
			__memo(() => import('./chunks/8-d5340f0e.js')),
			__memo(() => import('./chunks/9-70f0684c.js'))
		],
		routes: [
			{
				id: "/(front)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 9 },
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
				id: "/(admin)/admin/(back)/home",
				pattern: /^\/admin\/home\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-e3a3ca02.js'))
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
