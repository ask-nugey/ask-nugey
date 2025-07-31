import Image from "next/image";
import Link from "next/link";

import { css } from "@/lib/styled-system/css";
import { getAllPosts } from "@/src/app/_actions/posts";
import type { PageHomeProps } from "@/src/app/page";
import type { Post } from "@/src/models/post";
import { TagNavigation } from "@/src/ui/components/TagNavigation";
import { AllPosts } from "@/src/ui/view/home/_index/AllPosts";
import { ThemePosts } from "@/src/ui/view/home/_index/ThemePosts";

export const PageHomeView = async (props: PageHomeProps) => {
	const posts = await getAllPosts();

	const zennPosts = await (async () => {
		const articleRes = await fetch(
			"https://zenn.dev/api/articles?username=ask_nugey&order=latest"
		);
		const { articles }: { articles: ZennArticle[] } = await articleRes.json();

		const convertArticleToPost = (article: ZennArticle): Post => ({
			title: article.title,
			description: "",
			createdAt: new Date(article.published_at),
			updatedAt: article.body_updated_at
				? new Date(article.body_updated_at)
				: undefined,
			tags: [],
			slug: article.path,
			host: "zenn",
		});

		const scrapRes = await fetch(
			"https://zenn.dev/api/scraps?username=ask_nugey&order=latest"
		);
		const { scraps }: { scraps: Zennscrap[] } = await scrapRes.json();

		const convertScrapToPost = (scrap: Zennscrap): Post => ({
			title: scrap.title,
			description: "",
			createdAt: new Date(scrap.created_at),
			updatedAt: scrap.last_comment_created_at
				? new Date(scrap.last_comment_created_at)
				: undefined,
			// tags: scrap.topics.map(topic => topic.name),
			tags: [],
			slug: scrap.path,
			host: "zenn",
		});

		const posts: Post[] = [
			...articles.map(convertArticleToPost),
			...scraps.map(convertScrapToPost),
		];

		return posts;
	})();

	const qiitaPosts = await (async () => {
		const res = await fetch(
			"https://qiita.com/api/v2/users/ask_nugey/items?page=1&per_page=100"
		);
		const data: QiitaPost[] = await res.json();

		const convertDataToPost = (data: QiitaPost): Post => ({
			title: data.title,
			description: "",
			createdAt: new Date(data.created_at),
			updatedAt: data.updated_at && new Date(data.updated_at),
			tags: data.tags.map((tag) => tag.name),
			slug: data.url,
			host: "qiita",
		});

		const posts: Post[] = [...data.map(convertDataToPost)];

		return posts;
	})();

	const allPosts = [...posts, ...zennPosts, ...qiitaPosts];

	/**
	 * **新しい順に並び替えた記事**
	 * - updatedAtが存在する場合はそれを、存在しない場合はcreatedAtを基準に並び替え
	 */
	const sortedPostsByNewest = allPosts
		.filter((post): post is Post => post !== undefined)
		.sort((postA, postB) => {
			const dateA = new Date(postA.updatedAt ?? postA.createdAt).getTime();
			const dateB = new Date(postB.updatedAt ?? postB.createdAt).getTime();
			return dateB - dateA;
		});

	return (
		<>
			{/* メインビジュアル */}
			<div
				className={css({
					display: "grid",
					justifyContent: "center",
					paddingRight: 8,
					overflow: "hidden",
					mdDown: {
						margin: 4,
						paddingRight: 0,
					},
				})}
			>
				<Image
					alt="ヌギー(nugey)"
					src="/logo.png"
					width={400}
					height={400}
					className={css({
						marginBottom: "-4vw",
						marginLeft: "auto",
						mdDown: {
							width: "60vw",
							height: "60vw",
							marginBottom: "-10vw",
						},
					})}
				/>
				<p
					className={css({
						color: "gray.300",
						fontSize: "1.5vw",
						fontWeight: "bold",
						mdDown: {
							fontSize: "3.6vw",
						},
					})}
				>
					ヌギーにきいて！
					<br
						className={css({
							md: {
								display: "none",
							},
						})}
					/>
					(なんでもは知らないけど)
				</p>
				<p
					className={css({
						display: "flex",
						flexWrap: "wrap",
						columnGap: 4,
						alignItems: "baseline",
						color: "primary.500",
						fontWeight: "bold",
					})}
				>
					<span
						className={css({
							display: "inline-block",
							color: "inherit",
							fontSize: "8vw",
							lineHeight: 1.2,
							mdDown: {
								marginTop: 2,
								fontSize: "12vw",
							},
						})}
					>
						Ask Nugey!
					</span>
					<span
						className={css({
							display: "inline-block",
							color: "inherit",
							fontSize: "2vw",
							mdDown: {
								fontSize: "5vw",
							},
						})}
					>
						(But it doesn&apos;t know everything)
					</span>
				</p>
			</div>

			{/* タブ */}
			<div
				className={css({
					position: "relative",
					display: "flex",
					justifyContent: "center",
					marginTop: 8,

					_before: {
						content: '""',
						position: "absolute",
						bottom: 0,
						right: 0,
						left: 0,
						zIndex: 0,

						height: "1px",
						backgroundColor: "#cfc5ae",
					},
				})}
			>
				<div
					className={css({
						display: "flex",
						gap: 0.5,
						width: "100%",
						maxWidth: "1200px",
						margin: "auto",
						paddingInline: 4,
						mdDown: {
							paddingInline: 2,
						},
					})}
				>
					<div
						className={css(
							{
								position: "relative",
								zIndex: 1,
								color: "primary.300",
								backgroundColor: "bg.base",
								border: "1px solid",
								borderColor: "#cfc5ae",
								borderRadius: "16px 16px 0 0",
								fontWeight: "bold",
								_hover: {
									color: "primary.500",
								},
							},
							(!props.searchParams.tab || props.searchParams.tab === "all") && {
								color: "primary.500",
								borderBottom: 0,
							}
						)}
					>
						<Link
							href="/?tab=all"
							scroll={false}
							className={css({
								display: "block",
								padding: "8px 16px",
								color: "inherit",
							})}
						>
							一覧
						</Link>
					</div>

					<div
						className={css(
							{
								position: "relative",
								zIndex: 1,
								color: "primary.300",
								backgroundColor: "bg.base",
								border: "1px solid",
								borderColor: "#cfc5ae",
								borderRadius: "16px 16px 0 0",
								fontWeight: "bold",
								_hover: {
									color: "primary.500",
								},
							},
							props.searchParams.tab === "theme" && {
								color: "primary.500",
								borderBottom: 0,
							}
						)}
					>
						<Link
							href="/?tab=theme"
							scroll={false}
							className={css({
								display: "block",
								padding: "8px 16px",
								color: "inherit",
							})}
						>
							テーマ別
						</Link>
					</div>

					<div
						className={css(
							{
								position: "relative",
								zIndex: 1,
								color: "primary.300",
								backgroundColor: "bg.base",
								border: "1px solid",
								borderColor: "#cfc5ae",
								borderRadius: "16px 16px 0 0",
								fontWeight: "bold",
								_hover: {
									color: "primary.500",
								},
							},
							props.searchParams.tab === "zenn" && {
								color: "primary.500",
								borderBottom: 0,
							}
						)}
					>
						<Link
							href="/?tab=zenn"
							scroll={false}
							className={css({
								display: "block",
								padding: "8px 16px",
								color: "inherit",
							})}
						>
							Zenn
						</Link>
					</div>

					<div
						className={css(
							{
								position: "relative",
								zIndex: 1,
								color: "primary.300",
								backgroundColor: "bg.base",
								border: "1px solid",
								borderColor: "#cfc5ae",
								borderRadius: "16px 16px 0 0",
								fontWeight: "bold",
								_hover: {
									color: "primary.500",
								},
							},
							props.searchParams.tab === "qiita" && {
								color: "primary.500",
								borderBottom: 0,
							}
						)}
					>
						<Link
							href="/?tab=qiita"
							scroll={false}
							className={css({
								display: "block",
								padding: "8px 16px",
								color: "inherit",
							})}
						>
							Qiita
						</Link>
					</div>
				</div>
			</div>

			{/* コンテンツ */}
			<div
				className={css({
					width: "100%%",
					maxWidth: "1200px",
					margin: "auto",
					paddingInline: 5,
					mdDown: {
						paddingInline: 2,
					},
				})}
			>
				{(!props.searchParams.tab || props.searchParams.tab === "all") && (
					// タグナビ
					<>
						<div
							className={css({
								marginTop: 8,
								marginBottom: 6,
							})}
						>
							<TagNavigation />
						</div>
						<AllPosts posts={sortedPostsByNewest} />
					</>
				)}

				{props.searchParams.tab === "theme" && (
					<ThemePosts posts={sortedPostsByNewest} />
				)}

				{props.searchParams.tab === "zenn" && <AllPosts posts={zennPosts} />}

				{props.searchParams.tab === "qiita" && <AllPosts posts={qiitaPosts} />}
			</div>
		</>
	);
};

type ZennArticle = {
	id: number;
	post_type: string;
	title: string;
	slug: string;
	comments_count: number;
	liked_count: number;
	bookmarked_count: number;
	body_letters_count: number;
	article_type: string;
	emoji: string;
	is_suspending_private: boolean;
	published_at: Date;
	body_updated_at: Date;
	source_repo_updated_at: Date | null;
	pinned: boolean;
	path: string;
	user: ZennUser;
	publication: string | null;
};

type Zennscrap = {
	id: number;
	post_type: "Scrap";
	user_id: number;
	slug: string;
	title: string;
	closed: boolean;
	closed_at: null;
	archived: boolean;
	liked_count: number;
	can_others_post: boolean;
	comments_count: number;
	created_at: Date;
	last_comment_created_at: Date;
	should_noindex: boolean;
	path: string;
	topics: ZennTopic[];
	user: ZennUser;
};

type ZennUser = {
	id: number;
	username: string;
	name: string;
	avatar_small_url: string;
};

type ZennTopic = {
	id: number;
	name: string;
	taggings_count: number;
	image_url: string;
	display_name: string;
};

type QiitaPost = {
	comments_count: number;
	created_at: Date;
	id: string;
	likes_count: number;
	private: boolean;
	reactions_count: number;
	stocks_count: number;
	tags: {
		name: string;
		versions: [];
	}[];
	title: string;
	updated_at: Date;
	url: string;
};
