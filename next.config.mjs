import rehypePrism from '@mapbox/rehype-prism';
import nextMDX from '@next/mdx';
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		/**
		 * パスに型補完
		 *
		 * ```
		 * import type { Route } from 'next';
		 * import Link from 'next/link'
		 *
		 * // No TypeScript errors if href is a valid route
		 * <Link href="/about" />
		 * <Link href="/blog/nextjs" />
		 * <Link href={`/blog/${slug}`} />
		 * <Link href={('/blog' + slug) as Route} />
		 *
		 * // TypeScript errors if href is not a valid route
		 * <Link href="/aboot" />
		 * ```
		 *
		 * ```
		 * import type { Route } from 'next'
		 * import Link from 'next/link'
		 *
		 * function Card<T extends string>({ href }: { href: Route<T> | URL }) {
		 *   return (
		 *     <Link href={href}>
		 *       <div>My Card</div>
		 *     </Link>
		 *   )
		 * }
		 * ```
		 *
		 * 参考URL:
		 *   - https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
		 *   - https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
		 *   - https://zenn.dev/yarai/articles/e2476c2b39b0d5
		 */
		typedRoutes: true,
	},
};

const withMdx = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			remarkGfm,
			remarkMath,
			[remarkToc, { maxDepth: 3, heading: '目次' }],
		],
		rehypePlugins: [rehypeKatex, rehypePrism, rehypeSlug],
	},
});

export default withMdx(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();
