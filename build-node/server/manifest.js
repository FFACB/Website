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
		client: {"start":"_app/immutable/entry/start.1b041a9f.js","app":"_app/immutable/entry/app.0673074c.js","imports":["_app/immutable/entry/start.1b041a9f.js","_app/immutable/chunks/scheduler.005c20cf.js","_app/immutable/chunks/singletons.133142ae.js","_app/immutable/chunks/index.1aff895d.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.0673074c.js","_app/immutable/chunks/scheduler.005c20cf.js","_app/immutable/chunks/index.2f9bf333.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-333e492d.js')),
			__memo(() => import('./chunks/1-8ea3d1d6.js')),
			__memo(() => import('./chunks/2-cc67535e.js')),
			__memo(() => import('./chunks/3-d8dbe10d.js')),
			__memo(() => import('./chunks/4-b939068b.js')),
			__memo(() => import('./chunks/5-b3b0e0c7.js')),
			__memo(() => import('./chunks/6-a67f29cc.js')),
			__memo(() => import('./chunks/7-6ef74609.js'))
		],
		routes: [
			{
				id: "/(front)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/home",
				pattern: /^\/admin\/home\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-6ca2b1e6.js'))
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
