import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/src/app/_actions/posts';
import { PostDetailView } from '@/src/ui/view/posts/detail';

const siteName = 'Ask Nugey!（ヌギーにきいて!）';
const description = 'Ask Nugey! → プログラミング、デザイン、AI、CSS...etc';

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map(post => ({
		slug: post?.slug,
	}));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const post = await getPostBySlug(props.params.slug);

	return {
		title: post?.title,
		description: post?.description,
		openGraph: {
			title: `${post?.title} | ${siteName}`,
			description: `${post?.description} | ${siteName}`,
			images: [
				{
					url: 'https://ask-nugey.com/opengraph-image.png',
				},
			],
		},
		twitter: {
			title: `${post?.title} | ${siteName}`,
			description: `${post?.description} | ${description}`,
			images: [
				{
					url: 'https://ask-nugey.com/opengraph-image.png',
				},
			],
		},
	};
}

export default async function Page(props: Props) {
	const post = await getPostBySlug(props.params.slug);

	if (!post) notFound();

	return <PostDetailView post={post} />;
}
