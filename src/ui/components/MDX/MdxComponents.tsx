import { Divider } from 'antd';
import { Route } from 'next';
import Link from 'next/link';
import {
	ComponentProps,
	ComponentPropsWithoutRef,
	isValidElement,
} from 'react';

import { css } from '@/lib/styled-system/css';
import { siteConfig } from '@/src/constants';
import { LinkCard } from '@/src/ui/components/LinkCard';
import { TocHighlight } from '@/src/ui/components/Toc/TocHighlight';

import type { MDXComponents } from 'mdx/types';

type HeadingPropsType = ComponentPropsWithoutRef<'h1'>;

export const MdxComponents: MDXComponents = {
	h1: ({ children, ...props }: HeadingPropsType) => (
		<h1
			className={css({
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h1>
	),
	h2: ({ children, ...props }: HeadingPropsType) => (
		<h2
			className={css({
				marginTop: 6,
				padding: 4,
				color: 'white',
				fontSize: 'xl',
				fontWeight: 'bold',
				backgroundColor: 'primary.500',
				borderRadius: 'xl',
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h2>
	),
	h3: ({ children, ...props }: HeadingPropsType) => (
		<h3
			className={css({
				marginTop: 4,
				color: 'primary.500',
				fontSize: '2xl',
				fontWeight: 'bold',
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h3>
	),
	h4: ({ children, ...props }: HeadingPropsType) => (
		<h4
			className={css({
				marginTop: 4,
				color: '#333',
				fontSize: 'xl',
				fontWeight: 'bold',
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h4>
	),
	h5: ({ children, ...props }: HeadingPropsType) => (
		<h5
			className={css({
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h5>
	),
	h6: ({ children, ...props }: HeadingPropsType) => (
		<h6
			className={css({
				'& a': {
					color: 'inherit',
				},
			})}
			{...props}
		>
			{children}
		</h6>
	),

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
			const internalDomain = siteConfig.description;
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

	img: ({ children, ...props }: ComponentPropsWithoutRef<'img'>) => (
		<img
			className={css({
				marginTop: 4,
				marginBottom: 6,
			})}
			{...props}
		>
			{children}
		</img>
	),
	ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
		<ul
			className={css({
				paddingLeft: '1.5em',
				listStyleType: 'disc',
			})}
			{...props}
		>
			{children}
		</ul>
	),

	ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
		<ol
			className={css({
				paddingLeft: '1.5em',
				listStyleType: 'decimal',
			})}
			{...props}
		>
			{children}
		</ol>
	),

	table: ({ children }) => (
		<div style={{ overflowX: 'auto' }}>
			<table
				className={css({
					width: 'max-content',
					fontSize: '0.875rem', // text-sm
					textAlign: 'left',
					color: '#555',
					overflowX: 'auto',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-md
					borderRadius: '0.5rem', // sm:rounded-lg

					// mdDown: {
					// 	maxWidth: '600px',
					// },

					'& thead': {
						fontSize: '0.875rem', // text-sm
						color: '#374151', // text-gray-700
						backgroundColor: '#f9fafb', // bg-gray-50
					},

					'& tr': {
						borderBottom: '1px solid #e5e7eb', // border-b
					},

					'& th': {
						paddingLeft: '1.5rem', // px-6
						paddingRight: '1.5rem', // px-6
						paddingTop: '0.75rem', // py-3
						paddingBottom: '0.75rem', // py-3
					},

					'& td': {
						paddingLeft: '1.5rem', // px-6
						paddingRight: '1.5rem', // px-6
						paddingTop: '0.75rem', // py-3
						paddingBottom: '0.75rem', // py-3
					},
				})}
			>
				{children}
			</table>
		</div>
	),

	pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
		<div
			className={css({
				overflowX: 'auto',
				'& pre': {
					borderRadius: 'xl',
				},
			})}
		>
			<pre {...props}>{children}</pre>
		</div>
	),

	hr: () => <Divider />,

	aside: ({ children, ...props }: ComponentPropsWithoutRef<'aside'>) => (
		<>
			{props.id === 'articleToc' ? (
				<>
					<aside
						id="articleToc"
						className={css({
							marginTop: 6,

							md: {
								position: 'sticky',
								top: 6,
								flex: 'none',
								display: 'flex',
								justifyContent: 'flex-end',
								maxHeight: '100dvh',
								overflowX: 'hidden',
								overflowY: 'auto',
							},

							'& .is-active': {
								color: 'red.400',
								fontWeight: 'bold',
							},

							'& nav': {
								mdDown: {
									maxHeight: '300px',
									overflowY: 'auto',
								},
							},

							'& ul': {
								width: '100%',
								listStyleType: 'disc',
								margin: 0,
								paddingLeft: '1.5em',
								md: {
									maxWidth: '200px',
								},
							},
							'& ul ul': {
								paddingLeft: '1.1em',
							},
							'& li': {
								listStyleType: 'disc',
							},
							'& ul ul li': {
								listStyleType: 'disc',
							},
							'& ul li a': {
								width: '100%',
								display: 'block',
								textDecoration: 'none',
								lineHeight: 1.8,
								md: {
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								},
								'&:hover': {
									textDecoration: 'underline',
								},
							},
						})}
					>
						<div>
							<p>目次</p>
							<div>
								<TocHighlight>{children}</TocHighlight>
								{/* <AsideContent /> */}
							</div>
						</div>
					</aside>
				</>
			) : (
				<aside {...props}>{children}</aside>
			)}
		</>
	),
};
