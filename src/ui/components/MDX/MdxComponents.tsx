import { Divider } from 'antd';
import { Route } from 'next';
import Link from 'next/link';
import { ComponentProps, isValidElement } from 'react';

import { LinkCard } from '@/src/ui/components/LinkCard';

import type { MDXComponents } from 'mdx/types';

export const MdxComponents: MDXComponents = {
	p: ({ children }) => {
		/* aタグのカスタマイズ */
		// NOTE: `a: async ({ href, children }) => {~~}`でカスタマイズしてしまうと、
		//        親のpタグを無くしたり、divタグなどに変更できない
		if (isValidElement(children) && children.type === 'a') {
			const props = children.props as ComponentProps<'a'>;
			const href = props.href;
			const linkText = props.children;

			// ベタ書きリンク
			if (typeof linkText === 'string' && href === linkText) {
				return <LinkCard url={href} />;
			}

			// 内部リンク
			const internalDomain = 'ask-nugey.com';
			const isInternalLink =
				href?.startsWith('/') || href?.includes(internalDomain);
			if (isInternalLink) return <Link href={href as Route}>{linkText}</Link>;

			// 外部リンク
			return (
				<a href={href} target="_blank" rel="noopener noreferrer">
					{linkText}
				</a>
			);
		}

		/* デフォルトのpタグ */
		return <p>{children}</p>;
	},

	hr: () => <Divider />,

	table: ({ children }) => (
		<div style={{ overflowX: 'auto' }}>
			<table>{children}</table>
		</div>
	),
};
