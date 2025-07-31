import type { CategoryName } from "@/src/models/category";

export type TagName =
	| "Go"
	| "Rust"
	| "Python"
	| "js"
	| "TypeScript"
	| "React"
	| "NestJS"
	| "CSS"
	| "grid"
	| "Cloudflare"
	| "Hono"
	| "AI"
	| "Claude"
	| "Claude Code"
	| "モノレポ"
	| "moonrepo"
	| "proto"
	| "バージョン管理"
	| "Mac"
	| "技術スタック"
	| "ヌギー";

export type Tag = {
	name: TagName;
	description: string;
	categories: CategoryName[];
};

export const tags: Tag[] = [
	{
		name: "Go",
		description: "Go言語",
		categories: ["言語"],
	},
	{
		name: "Rust",
		description: "Rust言語",
		categories: ["言語"],
	},
	{
		name: "Python",
		description: "Python言語",
		categories: ["言語"],
	},
	{
		name: "js",
		description: "JavaScript言語",
		categories: ["言語"],
	},
	{
		name: "TypeScript",
		description: "TypeScript言語",
		categories: ["言語"],
	},
	{
		name: "React",
		description: "Reactフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "NestJS",
		description: "NestJSフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "CSS",
		description: "CSS技術",
		categories: ["技術"],
	},
	{
		name: "grid",
		description: "CSSグリッドレイアウト",
		categories: ["技術"],
	},
	{
		name: "Cloudflare",
		description: "Cloudflareサービス",
		categories: ["クラウド"],
	},
	{
		name: "Hono",
		description: "Honoフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "AI",
		description: "人工知能全般",
		categories: ["AI"],
	},
	{
		name: "Claude",
		description: "Claude AI",
		categories: ["AI"],
	},
	{
		name: "Claude Code",
		description: "Claude Code開発ツール",
		categories: ["AI"],
	},
	{
		name: "モノレポ",
		description: "モノレポ管理手法",
		categories: ["技術"],
	},
	{
		name: "moonrepo",
		description: "moonrepoツール",
		categories: ["技術"],
	},
	{
		name: "proto",
		description: "protoツール",
		categories: ["技術"],
	},
	{
		name: "バージョン管理",
		description: "バージョン管理システム",
		categories: ["技術"],
	},
	{
		name: "Mac",
		description: "macOSプラットフォーム",
		categories: ["プラットフォーム"],
	},
	{
		name: "技術スタック",
		description: "技術スタック構成",
		categories: ["技術"],
	},
	{
		name: "ヌギー",
		description: "ヌギー個人に関する内容",
		categories: ["その他"],
	},
];
