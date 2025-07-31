import Link from "next/link";
import { css } from "@/lib/styled-system/css";
import { Container } from "@/src/ui/components/layout/Container";

type Props = {
	tags: string[];
};

export const TagsListView = ({ tags }: Props) => {
	return (
		<Container wrapperStyles={wrapperStyles}>
			<div className={header}>
				<h1 className={title}>タグ一覧</h1>
				<Link href="/" className={backLink}>
					← ホームに戻る
				</Link>
			</div>

			<div className={tagsGrid}>
				{tags.map((tag) => (
					<Link
						key={tag}
						href={`/posts/tags/${encodeURIComponent(tag)}`}
						className={tagCard}
					>
						<span className={tagName}>#{tag}</span>
					</Link>
				))}
			</div>
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
	color: "primary.600",
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

const tagsGrid = css({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
	gap: 4,
});

const tagCard = css({
	display: "block",
	padding: 4,
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
		textDecoration: "underline",
		boxShadow: "sm",
	},
});

const tagName = css({
	fontSize: "md",
	fontWeight: "medium",
	color: "primary.600",
});
