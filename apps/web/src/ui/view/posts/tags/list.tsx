import Link from "next/link";
import { css } from "@/lib/styled-system/css";
import { categories } from "@/src/models/category";
import type { Post } from "@/src/models/post";
import { tags } from "@/src/models/tag";
import { Container } from "@/src/ui/components/layout/Container";

type Props = {
	posts: (Post | undefined)[];
};

export const TagsListView = ({ posts }: Props) => {
	// 各タグの記事件数を計算
	const getPostCount = (tagSlug: string) => {
		return posts.filter((post) =>
			post?.tags?.some((postTag) => String(postTag) === tagSlug)
		).length;
	};

	// カテゴリごとにタグをグルーピング
	const tagsByCategory = categories.map((category) => ({
		category,
		tags: tags.filter((tag) => tag.categories.includes(category.name)),
	}));

	return (
		<Container wrapperStyles={wrapperStyles}>
			<div className={header}>
				<h1 className={title}>タグ一覧</h1>
				<Link href="/" className={backLink}>
					← ホームに戻る
				</Link>
			</div>

			{tagsByCategory.map(({ category, tags: categoryTags }) => (
				<div key={category.name} className={categorySection}>
					<h2 className={categoryTitle}>{category.name}</h2>
					<p className={categoryDescription}>{category.description}</p>
					<div className={tagsGrid}>
						{categoryTags.map((tag) => {
							const postCount = getPostCount(tag.slug);
							return (
								<Link
									key={tag.slug}
									href={`/posts/tags/${tag.slug}`}
									className={tagCard}
								>
									<p className={tagName}>#{tag.name}</p>
									<div className={tagDescriptionContainer}>
										<span className={tagDescription}>{tag.description}</span>
										<span className={postCountStyle}>{postCount}件</span>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			))}
		</Container>
	);
};

const wrapperStyles = css.raw({
	paddingTop: 8,
});

const header = css({
	marginBottom: 12,
	textAlign: "center",
});

const title = css({
	fontSize: "4xl",
	fontWeight: "bold",
	marginBottom: 4,
	color: "primary.600",
});

const backLink = css({
	display: "inline-block",
	color: "primary.500",
	textDecoration: "none",
	fontSize: "md",
	"&:hover": {
		textDecoration: "underline",
	},
});

const categorySection = css({
	marginBottom: 12,
});

const categoryTitle = css({
	fontSize: "2xl",
	fontWeight: "bold",
	marginBottom: 2,
	color: "primary.700",
});

const categoryDescription = css({
	fontSize: "sm",
	color: "primary.500",
	marginBottom: 6,
});

const tagsGrid = css({
	display: "grid",
	gridTemplateColumns: {
		base: "repeat(2, 1fr)",
		md: "repeat(auto-fill, minmax(200px, 1fr))",
	},
	gap: { base: 2, md: 4 },
});

const tagCard = css({
	display: "flex",
	flexDirection: "column",
	gap: { base: 0.5, md: 2 },
	padding: { base: 1.5, md: 4 },
	color: "primary.600",
	backgroundColor: "white",
	border: "1px solid",
	borderColor: "primary.400",
	borderRadius: "md",
	textDecoration: "none",
	transition: "all 0.2s",
	"&:hover": {
		backgroundColor: "primary.50",
		borderColor: "primary.300",
		boxShadow: "sm",
	},
	"& p:hover": {
		textDecoration: "underline",
	},
});

const tagName = css({
	fontSize: "md",
	fontWeight: "medium",
	color: "primary.600",
});

const tagDescriptionContainer = css({
	display: "flex",
	flexWrap: "wrap",
	gap: 0.5,
});

const tagDescription = css({
	color: "primary.500",
	fontSize: "xs",
	marginBottom: 1,
});

const postCountStyle = css({
	marginLeft: "auto",
	fontSize: "xs",
	color: "primary.400",
	fontWeight: "medium",
	flex: "none",
});
