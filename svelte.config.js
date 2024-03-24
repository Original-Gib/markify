import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		csp: {
			mode: "hash",
			directives: { "script-src": ["self"] },
		},
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};

export default config;
