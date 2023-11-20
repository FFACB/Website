const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","main.css","main.scss","styles/base.scss","styles/reset.scss"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.9d9e27b9.js","app":"_app/immutable/entry/app.36d674b6.js","imports":["_app/immutable/entry/start.9d9e27b9.js","_app/immutable/chunks/main-client.9959a0b5.js","_app/immutable/chunks/runtime.bbe7a613.js","_app/immutable/chunks/singletons.89257710.js","_app/immutable/entry/app.36d674b6.js","_app/immutable/chunks/runtime.bbe7a613.js","_app/immutable/chunks/disclose-version.23df6a65.js","_app/immutable/chunks/main-client.9959a0b5.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-da2f0367.js')),
			__memo(() => import('./chunks/1-e9513713.js')),
			__memo(() => import('./chunks/2-a012036d.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
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
