'use server';

import postSlugs from '@/src/generated/postSlugs.json';
import { Post, PostMeta } from '@/src/types/post';

const getPostMeta = async (slug: string) => {
	const { meta }: { meta: PostMeta } = await import(`/src/post/${slug}/meta`);
	return meta;
};

export const getPostBySlug = async (slug: string) => {
	const meta = await getPostMeta(slug);
	if (!meta) return undefined;

	return { slug, ...meta } as Post;
};

export const getAllPosts = async () => {
	const posts = await Promise.all(
		postSlugs.map(async slug => {
			return getPostBySlug(slug);
		}),
	);
	return posts;
};
