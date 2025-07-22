import { Divider } from "antd";
import type { MDXComponents } from "mdx/types";
import type { Route } from "next";
import Link from "next/link";
import {
	type ComponentProps,
	type ComponentPropsWithoutRef,
	isValidElement,
} from "react";
import { css } from "@/lib/styled-system/css";
import { siteConfig } from "@/src/constants";
import postSlugs from "@/src/generated/postSlugs.json";
import { LinkCard } from "@/src/ui/components/LinkCard";
import { TocCard } from "@/src/ui/components/Toc/TocCard";

type HeadingPropsType = ComponentPropsWithoutRef<"h1">;

export const MdxComponents: MDXComponents = {
	h1: ({ children, ...props }: HeadingPropsType) => (
		<h1
			className={css({
				"& a": {
					color: "inherit",
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
				color: "white",
				fontSize: "xl",
				fontWeight: "bold",
				backgroundColor: "primary.500",
				borderRadius: "xl",
				"& a": {
					color: "inherit",
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
				color: "primary.500",
				fontSize: "2xl",
				fontWeight: "bold",
				"& a": {
					color: "inherit",
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
				color: "#333",
				fontSize: "xl",
				fontWeight: "bold",
				"& a": {
					color: "inherit",
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
				"& a": {
					color: "inherit",
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
				"& a": {
					color: "inherit",
				},
			})}
			{...props}
		>
			{children}
		</h6>
	),

	p: ({ children }) => {
		// 内部記事ならリンクカードで表示
		if (typeof children === "string" && postSlugs.includes(children)) {
			return <LinkCard url={children} />;
		}

		/* aタグのカスタマイズ */
		// NOTE: `a: async ({ href, children }) => {~~}`でカスタマイズしてしまうと、
		//        親のpタグを無くしたり、divタグなどに変更できない
		if (isValidElement(children) && children.type === "a") {
			const props = children.props as ComponentProps<"a">;
			const href = props.href;
			const linkText = props.children;

			// ベタ書きリンク
			if (typeof linkText === "string" && href === linkText) {
				return <LinkCard url={href} />;
			}

			// 内部リンク
			const internalDomain = siteConfig.description;
			const isInternalLink =
				href?.startsWith("/") || href?.includes(internalDomain);
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

	img: (props: ComponentProps<"img">) => (
		<img
			className={css({
				marginTop: 4,
				marginBottom: 6,
			})}
			alt={props.alt ?? ""}
			{...props}
		/>
	),
	ul: ({ children, ...props }: ComponentProps<"ul">) => (
		<ul
			className={css({
				paddingLeft: "1.5em",
				listStyleType: "disc",
			})}
			{...props}
		>
			{children}
		</ul>
	),

	ol: ({ children, ...props }: ComponentProps<"ol">) => (
		<ol
			className={css({
				paddingLeft: "1.5em",
				listStyleType: "decimal",
			})}
			{...props}
		>
			{children}
		</ol>
	),

	table: ({ children }) => (
		<div style={{ overflowX: "auto" }}>
			<table
				className={css({
					width: "max-content",
					fontSize: "0.875rem", // text-sm
					textAlign: "left",
					color: "#555",
					overflowX: "auto",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-md
					borderRadius: "0.5rem", // sm:rounded-lg

					// mdDown: {
					// 	maxWidth: '600px',
					// },

					"& thead": {
						fontSize: "0.875rem", // text-sm
						color: "#374151", // text-gray-700
						backgroundColor: "#f9fafb", // bg-gray-50
					},

					"& tr": {
						borderBottom: "1px solid #e5e7eb", // border-b
					},

					"& th": {
						paddingLeft: "1.5rem", // px-6
						paddingRight: "1.5rem", // px-6
						paddingTop: "0.75rem", // py-3
						paddingBottom: "0.75rem", // py-3
					},

					"& td": {
						paddingLeft: "1.5rem", // px-6
						paddingRight: "1.5rem", // px-6
						paddingTop: "0.75rem", // py-3
						paddingBottom: "0.75rem", // py-3
					},
				})}
			>
				{children}
			</table>
		</div>
	),

	pre: ({ children, ...props }: ComponentProps<"pre">) => (
		<div
			className={css({
				overflowX: "auto",
				"& pre": {
					borderRadius: "xl",
				},
			})}
		>
			<pre {...props}>{children}</pre>
		</div>
	),

	hr: () => <Divider />,

	aside: ({ children, ...props }: ComponentProps<"aside">) => (
		<>
			{props.id === "articleToc" ? (
				<TocCard>{children}</TocCard>
			) : (
				<aside {...props}>{children}</aside>
			)}
		</>
	),
};
