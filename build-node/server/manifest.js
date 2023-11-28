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
		client: {"start":"_app/immutable/entry/start.c4f2d22e.js","app":"_app/immutable/entry/app.95799873.js","imports":["_app/immutable/entry/start.c4f2d22e.js","_app/immutable/chunks/scheduler.b15faa91.js","_app/immutable/chunks/singletons.05c1f4ff.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.95799873.js","_app/immutable/chunks/scheduler.b15faa91.js","_app/immutable/chunks/index.e4cae9ee.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-4b1397ed.js')),
			__memo(() => import('./chunks/1-4377d4f1.js')),
			__memo(() => import('./chunks/2-8095a791.js')),
			__memo(() => import('./chunks/3-98b2eb96.js')),
			__memo(() => import('./chunks/4-08e4cef4.js')),
			__memo(() => import('./chunks/5-90b64c32.js')),
			__memo(() => import('./chunks/6-32f4a5ff.js')),
			__memo(() => import('./chunks/7-1e897d18.js')),
			__memo(() => import('./chunks/8-eee4e708.js')),
			__memo(() => import('./chunks/9-6afc3db7.js'))
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
