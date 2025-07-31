import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { css } from "@/lib/styled-system/css";

export const PageAuthorView = () => {
	return (
		<article
			className={css({
				display: "grid",
				gap: 2,

				maxWidth: 1024,
				width: "calc(100% - 16px)",
				margin: " 1rem auto",
				padding: 8,
				backgroundColor: "white",
				border: "1px solid",
				borderColor: "gray.200",
				borderRadius: "xl",

				mdDown: {
					padding: 4,
				},
			})}
		>
			<div
				className={css({
					gap: 4,
				})}
			>
				<ReactMarkdown
					remarkPlugins={[remarkMath, remarkGfm]}
					rehypePlugins={[rehypeKatex]}
					components={{
						p: ({ children }) => (
							<p
								className={css({
									my: 3,
									lineHeight: "relaxed",
									color: "gray.700",
									whiteSpace: "pre-line",
								})}
							>
								{children}
							</p>
						),
						h1: ({ children }) => (
							<h1
								className={css({
									fontSize: "3xl",
									fontWeight: "bold",
									mt: 6,
									mb: 3,
									pb: 2,
									borderBottomWidth: "1px",
									borderColor: "primary.200",
									color: "primary.700",
								})}
							>
								{children}
							</h1>
						),
						h2: ({ children }) => (
							<h2
								className={css({
									fontSize: "2xl",
									fontWeight: "bold",
									mt: 5,
									mb: 3,
									color: "primary.600",
								})}
							>
								{children}
							</h2>
						),
						h3: ({ children }) => (
							<h3
								className={css({
									fontSize: "xl",
									fontWeight: "bold",
									mt: 4,
									mb: 2,
									color: "primary.500",
								})}
							>
								{children}
							</h3>
						),
						ul: ({ children }) => (
							<ul
								className={css({
									my: 3,
									pl: 8,
									listStyleType: "disc",
									color: "gray.700",
								})}
							>
								{children}
							</ul>
						),
						ol: ({ children }) => (
							<ol
								className={css({
									my: 3,
									pl: 8,
									listStyleType: "decimal",
									color: "gray.700",
								})}
							>
								{children}
							</ol>
						),
						li: ({ children }) => (
							<li
								className={css({
									my: 2,
									lineHeight: "relaxed",
								})}
							>
								{children}
							</li>
						),
						br: () => <br />,
						table: ({ children }) => (
							<div
								className={css({
									overflowX: "auto",
									my: 5,
									rounded: "md",
									shadow: "sm",
								})}
							>
								<table
									className={css({
										width: "full",
										borderCollapse: "separate",
										borderSpacing: 0,
										borderWidth: "1px",
										borderColor: "gray.200",
										rounded: "md",
										overflow: "hidden",
									})}
								>
									{children}
								</table>
							</div>
						),
						thead: ({ children }) => (
							<thead
								className={css({
									bg: "gray.50",
									borderBottomWidth: "1px",
									borderColor: "gray.200",
								})}
							>
								{children}
							</thead>
						),
						tbody: ({ children }) => (
							<tbody
								className={css({
									bg: "white",
									divideColor: "gray.200",
								})}
							>
								{children}
							</tbody>
						),
						tr: ({ children }) => (
							<tr
								className={css({
									_hover: { bg: "gray.50" },
									transition: "all 0.2s",
								})}
							>
								{children}
							</tr>
						),
						th: ({ children }) => (
							<th
								className={css({
									px: 4,
									py: 3,
									textAlign: "left",
									fontSize: "xs",
									fontWeight: "semibold",
									textTransform: "uppercase",
									letterSpacing: "wider",
									color: "gray.700",
									borderRightWidth: "1px",
									borderColor: "gray.200",
									_last: { borderRightWidth: 0 },
								})}
							>
								{children}
							</th>
						),
						td: ({ children }) => (
							<td
								className={css({
									px: 4,
									py: 3,
									fontSize: "sm",
									color: "gray.700",
									borderRightWidth: "1px",
									borderColor: "gray.200",
									_last: { borderRightWidth: 0 },
									whiteSpace: "pre-wrap",
								})}
							>
								{children}
							</td>
						),
						blockquote: ({ children }) => (
							<blockquote
								className={css({
									borderLeftWidth: "4px",
									borderColor: "primary.200",
									pl: 5,
									py: 2,
									my: 3,
									color: "gray.600",
									fontStyle: "italic",
									bg: "gray.50",
									rounded: "sm",
									pr: 4,
								})}
							>
								{children}
							</blockquote>
						),
						code: ({ children, className }) => {
							const match = /language-(\w+)/.exec(className || "");
							return (
								<div
									className={css({
										my: 3,
										overflow: "auto",
										rounded: "md",
										bg: match ? "gray.900" : "gray.100",
										shadow: "sm",
									})}
								>
									<pre
										className={css({
											color: match ? "gray.100" : "gray.800",
											p: 4,
											fontSize: "sm",
											overflow: "auto",
											fontFamily: "mono",
										})}
									>
										<code className={className}>{children}</code>
									</pre>
								</div>
							);
						},
						img: ({ src, alt }) => {
							// 画像が見つからない場合は元のsrcを使用
							return (
								<img
									src={src}
									alt={alt}
									className={css({
										maxWidth: "full",
										height: "auto",
										rounded: "md",
										shadow: "md",
										my: 4,
										mx: "auto",
										display: "block",
										transition: "transform 0.3s ease",
										_hover: {
											transform: "scale(1.01)",
											shadow: "lg",
										},
									})}
								/>
							);
						},
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</article>
	);
};

const content = `
## 自己紹介
- 名前: ヌギー / nugey
- 職業: ITエンジニア

## SNS
- [Twitter - @ask_nugey](https://x.com/ask_nugey)
- [GitHub - @ask-nugey](https://github.com/ask-nugey)
- [Zenn - @ask-nugey](https://zenn.dev/ask_nugey)
- [Qiita - @ask-nugey](https://qiita.com/ask_nugey)
- [Note - @ask_nugey](https://note.com/ask_nugey)
`;
