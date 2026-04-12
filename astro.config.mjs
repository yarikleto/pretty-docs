// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://yarikleto.github.io',
	base: '/pretty-docs',
	integrations: [
		starlight({
			title: 'Pretty Docs',
			customCss: ['./src/styles/custom.css'],
			components: {
				Search: './src/components/Search.astro',
			},
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' } },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yarikleto/pretty-docs' }],
			sidebar: [
				{
					label: 'Networking',
					items: [
						{ label: 'File Transfer Protocol (FTP)', slug: 'w3.org/Protocols/rfc959' },
					],
				},
				{
					label: 'Programming Languages',
					items: [
						{ label: 'C++ Cheatsheet', slug: 'geeksforgeeks.org/cpp/cpp-cheatsheet' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'Write an article', slug: 'contributing/write-an-article' },
						{ label: 'Style guide', slug: 'contributing/style-guide' },
					],
				},
			],
		}),
	],
});
