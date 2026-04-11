// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Pretty Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/YaroslavPakhaliuk/pretty-docs' }],
			sidebar: [
				{
					label: 'Protocols',
					autogenerate: { directory: 'protocols' },
				},
				{
					label: 'C Libraries',
					autogenerate: { directory: 'c-libraries' },
				},
			],
		}),
	],
});
