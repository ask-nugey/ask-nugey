import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostsByTag } from "@/src/app/_actions/posts";
import { siteConfig } from "@/src/constants";
import { tags } from "@/src/models/tag";
import { PostsByTagView } from "@/src/ui/view/posts/tags";

export async function generateStaticParams() {
	return tags.map((tag) => ({
		tag: encodeURIComponent(tag.name),
	}));
}

export const dynamicParams = false;

type Props = {
	params: {
		tag: string;
	};
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const tag = decodeURIComponent(props.params.tag);
	const posts = await getPostsByTag(tag);

	if (posts.length === 0) {
		return {
			title: "記事が見つかりません",
			description: "指定されたタグの記事が見つかりません",
		};
	}

	return {
		title: `${tag}の記事`,
		description: `${tag}に関する記事一覧（${posts.length}件）`,
		openGraph: {
			title: `${tag}の記事 | ${siteConfig.name}`,
			description: `${tag}に関する記事一覧（${posts.length}件） | ${siteConfig.name}`,
			images: [
				{
					url: "/opengraph-image.png",
					width: 1200,
					height: 630,
					alt: `${tag}の記事`,
				},
			],
		},
		twitter: {
			title: `${tag}の記事 | ${siteConfig.name}`,
			description: `${tag}に関する記事一覧（${posts.length}件） | ${siteConfig.name}`,
			images: [
				{
					url: "/opengraph-image.png",
					width: 1200,
					height: 630,
					alt: `${tag}の記事`,
				},
			],
		},
		alternates: {
			canonical: `https://${siteConfig.domain}/posts/tags/${encodeURIComponent(tag)}`,
		},
	};
}

export default async function Page(props: Props) {
	const tagName = decodeURIComponent(props.params.tag);
	const posts = await getPostsByTag(tagName);
	const tagData = tags.find((tag) => tag.name === tagName);

	if (posts.length === 0 || !tagData) {
		notFound();
	}

	return <PostsByTagView tag={tagData} posts={posts} />;
}
