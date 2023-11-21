const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/exper-bleu.png","main.css","main.scss","styles/base.scss","styles/reset.scss"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.56d4b241.js","app":"_app/immutable/entry/app.7ccac719.js","imports":["_app/immutable/entry/start.56d4b241.js","_app/immutable/chunks/main-client.aebd5097.js","_app/immutable/chunks/runtime.b23a58cc.js","_app/immutable/chunks/singletons.b850a235.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.7ccac719.js","_app/immutable/chunks/runtime.b23a58cc.js","_app/immutable/chunks/disclose-version.ba38736e.js","_app/immutable/chunks/main-client.aebd5097.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-b97a5e93.js')),
			__memo(() => import('./chunks/1-e5dcb5f3.js')),
			__memo(() => import('./chunks/2-bde10cf7.js')),
			__memo(() => import('./chunks/3-d1906ca6.js')),
			__memo(() => import('./chunks/4-cc760ec9.js')),
			__memo(() => import('./chunks/5-c7a478d5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/(back)/home",
				pattern: /^\/admin\/home\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(admin)/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
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
