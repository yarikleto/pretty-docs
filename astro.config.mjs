// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	// TODO: set your domain here. For GitHub Pages project site use:
	// site: 'https://yourdomain.github.io', base: '/pretty-docs'
	// For custom domain: site: 'https://prettydocs.dev' (no base needed)
	site: 'https://example.com',
	base: '/pretty-docs',
	integrations: [
		starlight({
			title: 'Pretty Docs',
			customCss: ['./src/styles/custom.css'],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' } },
				// Auto-open search when navigating from landing page with #_search
				{ tag: 'script', content: `if(location.hash==="#_search"){history.replaceState(null,"",location.pathname);setTimeout(()=>{document.querySelector("button[data-open-modal]")?.click()},200)}` },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yarikleto/pretty-docs' }],
			sidebar: [
				{
					label: 'Networking',
					autogenerate: { directory: 'networking' },
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
