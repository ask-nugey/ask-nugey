import { Tag } from "antd";
import Link from "next/link";
import { css } from "@/lib/styled-system/css";
import { tags } from "@/src/models/tag";

export const TagNavigation = () => {
	return (
		<div className={container}>
			<div className={header}>
				<h3 className={title}>タグで探す</h3>
				<Link href="/posts/tags" className={viewAllLink}>
					すべてのタグを見る →
				</Link>
			</div>

			<div className={tagsScrollContainer}>
				<div className={tagsList}>
					{tags.map((tag) => (
						<Link
							key={tag.slug}
							href={`/posts/tags/${tag.slug}`}
						>
							<Tag
								color="gold"
								className={css({
									p: 1,
									borderColor: "primary.400",
									_hover: {
										color: "white",
										backgroundColor: "primary.500",
										borderColor: "primary.500",
									},
								})}
							>
								#{tag.name}
							</Tag>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

const container = css({
	width: "100%",
	overflow: "hidden",
});

const header = css({
	display: "flex",
	alignItems: "center",
	gap: 4,
	marginBottom: 4,
});

const title = css({
	fontSize: "lg",
	fontWeight: "bold",
	color: "primary.600",
});

const viewAllLink = css({
	fontSize: "sm",
	color: "primary.500",
	fontWeight: "bold",
	textDecoration: "underline",
	"&:hover": {
		textDecoration: "none",
	},
});

const tagsScrollContainer = css({
	overflow: "auto",
	position: "relative",
	display: "grid",
});

const tagsList = css({
	display: "flex",
	gap: 1,
	overflowX: "auto",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": {
		display: "none",
	},
	paddingBottom: 2,
});
