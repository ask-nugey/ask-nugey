import Link from "next/link";
import { css } from "@/lib/styled-system/css";
import type { Post } from "@/src/models/post";
import { Container } from "@/src/ui/components/layout/Container";
import { AllPosts } from "@/src/ui/view/home/_index/AllPosts";

type Props = {
	tag: string;
	posts: (Post | undefined)[];
};

export const PostsByTagView = ({ tag, posts }: Props) => {
	const validPosts = posts.filter((post): post is Post => post !== undefined);

	return (
		<Container wrapperStyles={wrapperStyles}>
			<div className={header}>
				<h1 className={title}>
					<span className={tagText}>#{tag}</span> の記事
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
	paddingTop: 4,
});

const header = css({
	marginBottom: 12,
	textAlign: "center",
});

const title = css({
	fontSize: "4xl",
	fontWeight: "bold",
	marginBottom: 4,
	color: "primary.500",
});

const tagText = css({
	fontSize: "5xl",
	color: "primary.600",
});

const description = css({
	fontSize: "xl",
	color: "primary.600",
	marginBottom: 4,
});

const backLink = css({
	display: "inline-block",
	color: "primary.600",
	textDecoration: "none",
	fontSize: "md",
	"&:hover": {
		textDecoration: "underline",
	},
});
