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
		client: {"start":"_app/immutable/entry/start.92da861d.js","app":"_app/immutable/entry/app.7363b39e.js","imports":["_app/immutable/entry/start.92da861d.js","_app/immutable/chunks/scheduler.ac6ecc1c.js","_app/immutable/chunks/singletons.d831195b.js","_app/immutable/chunks/index.b95c7ae7.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.7363b39e.js","_app/immutable/chunks/scheduler.ac6ecc1c.js","_app/immutable/chunks/index.6bb7e777.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-be86c78f.js')),
			__memo(() => import('./chunks/1-c7ccfb5b.js')),
			__memo(() => import('./chunks/2-87121502.js')),
			__memo(() => import('./chunks/3-080ebbeb.js')),
			__memo(() => import('./chunks/4-c3bc4457.js')),
			__memo(() => import('./chunks/5-616905ed.js')),
			__memo(() => import('./chunks/6-72f0d9dd.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
