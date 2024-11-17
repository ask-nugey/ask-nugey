type Tag =
	| 'Go'
	| 'Rust'
	| 'Python'
	| 'js'
	| 'TypeScript'
	| 'React'
	| 'NestJS'
	| 'CSS'
	| 'grid'
	| 'Cloudflare'
	| 'Hono'
	| 'AI'
	| 'モノレポ'
	| 'moonrepo'
	| 'Mac'
	| '技術スタック'
	| 'ヌギー';

export type Post = {
	title: string;
	description: string;
	createdAt: Date;
	updatedAt?: Date;
	tags: Tag[];
	slug: string;
};

/**
 * **記事のメタ情報**
 * - `src/post/〜〜/meta.ts` で使用する
 * - 記事のslug情報は「〜〜」のディレクトリ名から取得している
 */
export type PostMeta = Omit<Post, 'slug'>;
