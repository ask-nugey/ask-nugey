import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/src/app/_actions/posts';
import { siteConfig } from '@/src/constants';
import { PostDetailView } from '@/src/ui/view/posts/detail';

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map(post => ({
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
					url: `https://${siteConfig.domain}/opengraph-image.png`,
				},
			],
		},
		twitter: {
			title: `${post?.title} | ${siteConfig.name}`,
			description: `${post?.description} | ${siteConfig.name}`,
			images: [
				{
					url: `https://${siteConfig.domain}/opengraph-image.png`,
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
