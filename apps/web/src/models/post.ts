import type { TagSlug } from "@/src/models/tag";

export type Post = {
	title: string;
	description: string;
	createdAt: Date;
	updatedAt?: Date;
	tags: TagSlug[];
	otherTags?: string[];
	slug: string;
	host?: "zenn" | "qiita" | "note";
};

/**
 * **記事のメタ情報**
 * - `src/post/〜〜/meta.ts` で使用する
 * - 記事のslug情報は「〜〜」のディレクトリ名から取得している
 */
export type PostMeta = Omit<Post, "slug" | "host">;
