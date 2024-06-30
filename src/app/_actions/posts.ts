'use server';

import fs from 'fs';
import path from 'path';

import { Post, PostMeta } from '@/src/types/post';

const postsDirectory = path.join(process.cwd(), '/src/post/');

const postSlugs = fs.readdirSync(postsDirectory).filter(file => {
	const filePath = path.join(postsDirectory, file);
	return (
		fs.statSync(filePath).isDirectory() &&
		fs.existsSync(path.join(filePath, 'meta.ts'))
	);
});

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
