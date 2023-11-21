import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocessor from'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocessor({
		scss: {
			outputStyle: 'compressed',
			outFile: './static/main.css',
            prependData: "@import './static/main.scss';"
        }
	})],
	kit: {
	
		csrf: {
			checkOrigin: false,
		},
		
		adapter: adapterNode({
            out: 'build-node', //Must be the same name as the one in dockerfile COPY --from=build /app/build-node
            precompress: false,
            envPrefix: '',
            polyfill: true
        }),
		prerender:{
			
			crawl:true
		},

	}
};

export default config;

