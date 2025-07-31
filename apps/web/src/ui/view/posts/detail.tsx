import { HomeFilled, QuestionCircleFilled } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { format } from "date-fns";
import dynamic from "next/dynamic";

import { css } from "@/lib/styled-system/css";
import type { Post } from "@/src/models/post";
import { CommentCard } from "@/src/ui/components/CommentCard";
import { GoogleAd } from "@/src/ui/components/GoogleAd";
import { Loading } from "@/src/ui/components/Loading";
import { TocCard } from "@/src/ui/components/Toc/TocCard";

type Props = {
	post: Post;
};

export const PostDetailView = (props: Props) => {
	const PostContent = dynamic(
		() => import(`/src/post/${props.post.slug}/content.mdx`),
		{
			loading: () => (
				<Loading
					tip="　Loading..."
					wrapperStyles={css.raw({ mb: "50vh", p: 0 })}
				>
					<div
						className={css({
							gap: 4,
							md: {
								display: "flex",
								flexDirection: "row-reverse",
							},
						})}
					>
						<TocCard>
							<nav>
								<ul>
									<li>
										<a href={`#${props.post.slug}`}>{props.post.title}</a>
									</li>
								</ul>
							</nav>
						</TocCard>
						<div className="article-content">
							<h2
								className={css({
									marginTop: 6,
									padding: 4,
									color: "white",
									fontSize: "xl",
									fontWeight: "bold",
									backgroundColor: "primary.500",
									borderRadius: "xl",
									overflow: "hidden",
									whiteSpace: "nowrap",
									"& a": {
										color: "inherit",
									},
								})}
							>
								{props.post.title}
							</h2>
							<p>{props.post.description}</p>
						</div>
					</div>
				</Loading>
			),
		}
	);

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
			<header>
				<time
					dateTime={props.post.createdAt.toDateString()}
					className={css({
						display: "block",
						color: "gray.400",
					})}
				>
					{format(props.post.createdAt, "yyyy/MM/d")}
				</time>
				<h1
					className={css({
						fontSize: "3xl",
						fontWeight: "bold",
					})}
				>
					{props.post.title}
				</h1>
				<div
					className={css({
						display: "flex",
						flexWrap: "wrap",
						marginBottom: 4,
					})}
				>
					{props.post.tags.map((tag) => (
						<Tag key={tag} color="gold">
							# {tag}
						</Tag>
					))}
				</div>
			</header>
			<div
				className={css({
					gap: 4,

					md: {
						display: "flex",
						flexDirection: "row-reverse",
					},

					"& .article-content": {
						display: "grid",
						gap: 4,
						w: "100%",
					},
				})}
			>
				<PostContent />
			</div>
			<GoogleAd styles={css.raw({ mt: 4 })} />
			<footer>
				<div
					className={css({
						display: "grid",
						gap: 4,
						marginTop: 8,
						marginBottom: 4,
						marginInline: "auto",
					})}
				>
					<a
						href="https://marshmallow-qa.com/bw99ezhmow42xg9"
						target="_blank"
						rel="noreferrer"
					>
						<Button
							type="primary"
							icon={<QuestionCircleFilled />}
							className={css({
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								fontWeight: "bold",
							})}
						>
							Ask Nugey!（マシュマロで質問）
						</Button>
					</a>
					<a href="/">
						<Button
							type="primary"
							icon={<HomeFilled />}
							className={css({
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								fontWeight: "bold",
							})}
						>
							トップに戻る
						</Button>
					</a>
				</div>
				<CommentCard />
			</footer>
		</article>
	);
};
