type Tag =
	| 'Go'
	| 'Rust'
	| 'js'
	| 'React'
	| 'CSS'
	| 'grid'
	| 'Cloudflare'
	| 'Hono'
	| 'AI'
	| 'Mac'
	| '技術スタック'
	| 'ヌギー';

export type PostMeta = {
	title: string;
	description: string;
	createdAt: Date;
	updatedAt?: Date;
	tags: Tag[];
};

export type Post = { slug: string } & PostMeta;
