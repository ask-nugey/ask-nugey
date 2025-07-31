"use server";

import postSlugs from "@/src/generated/postSlugs.json";
import type { Post, PostMeta } from "@/src/models/post";

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

export const getAllTags = async () => {
	const posts = await getAllPosts();
	const tagsSet = new Set<string>();

	for (const post of posts) {
		if (post?.tags) {
			for (const tag of post.tags) {
				tagsSet.add(String(tag));
			}
		}
	}

	return Array.from(tagsSet).sort();
};

export const getPostsByTag = async (tag: string) => {
	const posts = await getAllPosts();
	return posts.filter((post) =>
		post?.tags?.some((postTag) => String(postTag) === tag)
	);
};
