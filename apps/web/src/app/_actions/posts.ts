"use server";

import postSlugs from "@/src/generated/postSlugs.json";
import type { Post, PostMeta } from "@/src/models/post";
import type { TagSlug } from "@/src/models/tag";

const getPostMeta = async (slug: string) => {
	try {
		const { meta }: { meta: PostMeta } = await import(`/src/post/${slug}/meta`);
		return meta;
	} catch (error) {
		console.error("🔥 getPostMeta error: ");
		console.error(error);

		return undefined;
	}
};

export const getPostBySlug = async (slug: string) => {
	const meta = await getPostMeta(slug);
	if (!meta) return undefined;

	return { slug, ...meta } as Post;
};

export const getAllPosts = async () => {
	const posts = await Promise.all(
		postSlugs.map(async (slug) => {
			return getPostBySlug(slug);
		})
	);
	return posts;
};

export const getPostsByTag = async (tagSlug: TagSlug) => {
	const posts = await getAllPosts();

	const filteredPosts = posts.filter((post) => {
		const hasTag = post?.tags?.some((postTag) => postTag === tagSlug);
		return hasTag;
	});

	return filteredPosts;
};
