import type { Metadata } from "next";

import { getAllTags } from "@/src/app/_actions/posts";
import { siteConfig } from "@/src/constants";
import { TagsListView } from "@/src/ui/view/posts/tags/list";

export const metadata: Metadata = {
	title: "タグ一覧",
	description: "投稿されたすべてのタグ一覧",
	openGraph: {
		title: `タグ一覧 | ${siteConfig.name}`,
		description: `投稿されたすべてのタグ一覧 | ${siteConfig.name}`,
		images: [
			{
				url: '/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: "タグ一覧",
			},
		],
	},
	twitter: {
		title: `タグ一覧 | ${siteConfig.name}`,
		description: `投稿されたすべてのタグ一覧 | ${siteConfig.name}`,
		images: [
			{
				url: '/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: "タグ一覧",
			},
		],
	},
	alternates: {
		canonical: `https://${siteConfig.domain}/posts/tags`,
	},
};

export default async function Page() {
	const tags = await getAllTags();

	return <TagsListView tags={tags} />;
}