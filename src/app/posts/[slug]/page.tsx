import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/src/app/_actions/posts';
import { PostDetailView } from '@/src/ui/view/posts/detail';

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

export default async function Page(props: Props) {
	const post = await getPostBySlug(props.params.slug);

	if (!post) notFound();

	return <PostDetailView post={post} />;
}
