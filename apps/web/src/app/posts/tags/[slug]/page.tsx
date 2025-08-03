import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostsByTag } from "@/src/app/_actions/posts";
import { siteConfig } from "@/src/constants";
import type { TagSlug } from "@/src/models/tag";
import { tags } from "@/src/models/tag";
import { PostsByTagView } from "@/src/ui/view/posts/tags";

// 型ガード関数
const isValidTagSlug = (slug: string): slug is TagSlug => {
	return tags.some((tag) => tag.slug === slug);
};

export async function generateStaticParams() {
	return tags.map((tag) => ({
		slug: tag.slug,
	}));
}

export const dynamicParams = false;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const tagSlug = props.params.slug;

	if (!isValidTagSlug(tagSlug)) {
		return {
			title: "タグが見つかりません",
			description: "指定されたタグが見つかりません",
		};
	}

	const tagData = tags.find((tag) => tag.slug === tagSlug);
	const tagName = tagData?.name || tagSlug;
	const posts = await getPostsByTag(tagSlug);

	if (posts.length === 0) {
		return {
			title: "記事が見つかりません",
			description: "指定されたタグの記事が見つかりません",
		};
	}

	return {
		title: `${tagName}の記事`,
		description: `${tagName}に関する記事一覧（${posts.length}件）`,
		openGraph: {
			title: `${tagName}の記事 | ${siteConfig.name}`,
			description: `${tagName}に関する記事一覧（${posts.length}件） | ${siteConfig.name}`,
			images: [
				{
					url: "/opengraph-image.png",
					width: 1200,
					height: 630,
					alt: `${tagName}の記事`,
				},
			],
		},
		twitter: {
			title: `${tagName}の記事 | ${siteConfig.name}`,
			description: `${tagName}に関する記事一覧（${posts.length}件） | ${siteConfig.name}`,
			images: [
				{
					url: "/opengraph-image.png",
					width: 1200,
					height: 630,
					alt: `${tagName}の記事`,
				},
			],
		},
		alternates: {
			canonical: `https://${siteConfig.domain}/posts/tags/${tagSlug}`,
		},
	};
}

export default async function Page(props: Props) {
	const paramSlug = props.params.slug;

	if (!isValidTagSlug(paramSlug)) {
		notFound();
	}

	const tagSlug = paramSlug;
	const tagData = tags.find((tag) => tag.slug === tagSlug);

	const posts = await getPostsByTag(tagSlug);

	if (posts.length === 0 || !tagData) {
		notFound();
	}

	return <PostsByTagView tag={tagData} posts={posts} />;
}
