import Link from "next/link";
import { css } from "@/lib/styled-system/css";
import type { Post } from "@/src/models/post";
import type { Tag } from "@/src/models/tag";
import { Container } from "@/src/ui/components/layout/Container";
import { AllPosts } from "@/src/ui/view/home/_index/AllPosts";

type Props = {
	tag: Tag;
	posts: (Post | undefined)[];
};

export const PostsByTagView = ({ tag, posts }: Props) => {
	const validPosts = posts.filter((post): post is Post => post !== undefined);

	return (
		<Container wrapperStyles={wrapperStyles}>
			<div className={header}>
				<p className={tagDescription}>{tag.description}</p>
				<h1 className={title}>
					<span className={tagText}>#{tag.name}</span> の記事
				</h1>
				<p className={description}>
					{validPosts.length}件の記事が見つかりました
				</p>
				<Link href="/" className={backLink}>
					← ホームに戻る
				</Link>
			</div>

			<AllPosts posts={validPosts} />
		</Container>
	);
};

const wrapperStyles = css.raw({
	paddingTop: 6,
});

const header = css({
	marginBottom: 12,
	textAlign: "center",
});

const tagDescription = css({
	fontSize: "lg",
	color: "primary.500",
});

const title = css({
	fontSize: "4xl",
	fontWeight: "bold",
	marginBottom: 6,
	color: "primary.500",
	lineHeight: 1,
});

const tagText = css({
	fontSize: "5xl",
	color: "primary.600",
});

const description = css({
	fontSize: "md",
	color: "primary.600",
	marginBottom: 8,
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
