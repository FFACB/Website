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
		client: {"start":"_app/immutable/entry/start.0583543d.js","app":"_app/immutable/entry/app.ebe914ed.js","imports":["_app/immutable/entry/start.0583543d.js","_app/immutable/chunks/main-client.9959a0b5.js","_app/immutable/chunks/runtime.bbe7a613.js","_app/immutable/chunks/singletons.8e2deb5f.js","_app/immutable/entry/app.ebe914ed.js","_app/immutable/chunks/runtime.bbe7a613.js","_app/immutable/chunks/disclose-version.ac9f713d.js","_app/immutable/chunks/validate.b0d5a885.js","_app/immutable/chunks/main-client.9959a0b5.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-54ce8cec.js')),
			__memo(() => import('./chunks/1-d9b66385.js')),
			__memo(() => import('./chunks/2-edce59ae.js')),
			__memo(() => import('./chunks/3-3796eea1.js'))
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
				id: "/(back)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
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
