import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllPosts, getPostBySlug } from "@/src/app/_actions/posts";
import { siteConfig } from "@/src/constants";
import { PostDetailView } from "@/src/ui/view/posts/detail";

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post?.slug,
	}));
}

// generateStaticParams で定義したパス以外でリクエストされた際、404ページへ
export const dynamicParams = false;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const post = await getPostBySlug(props.params.slug);

	return {
		title: post?.title,
		description: post?.description,
		openGraph: {
			title: `${post?.title} | ${siteConfig.name}`,
			description: `${post?.description} | ${siteConfig.name}`,
			images: [
				{
					url: '/opengraph-image.png',
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
		twitter: {
			title: `${post?.title} | ${siteConfig.name}`,
			description: `${post?.description} | ${siteConfig.name}`,
			images: [
				{
					url: '/opengraph-image.png',
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
		alternates: {
			canonical: `https://${siteConfig.domain}/posts/${props.params.slug}`,
		},
	};
}

export default async function Page(props: Props) {
	const post = await getPostBySlug(props.params.slug);

	if (!post) notFound();

	return <PostDetailView post={post} />;
}
