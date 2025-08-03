import type { CategoryName } from "@/src/models/category";

export type TagName =
	| "Go"
	| "Rust"
	| "Python"
	| "js"
	| "TypeScript"
	| "React"
	| "Next.js"
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

export type TagSlug =
	| "go"
	| "rust"
	| "python"
	| "js"
	| "typescript"
	| "react"
	| "nextjs"
	| "nestjs"
	| "css"
	| "grid"
	| "cloudflare"
	| "hono"
	| "ai"
	| "claude"
	| "claude-code"
	| "monorepo"
	| "moonrepo"
	| "proto"
	| "version-control"
	| "mac"
	| "tech-stack"
	| "nugey";

export type Tag = {
	name: string;
	slug: TagSlug;
	description: string;
	categories: CategoryName[];
};

export const tags: Tag[] = [
	{
		name: "Go",
		slug: "go",
		description: "Go言語",
		categories: ["言語"],
	},
	{
		name: "Rust",
		slug: "rust",
		description: "Rust言語",
		categories: ["言語"],
	},
	{
		name: "Python",
		slug: "python",
		description: "Python言語",
		categories: ["言語"],
	},
	{
		name: "js",
		slug: "js",
		description: "JavaScript言語",
		categories: ["言語"],
	},
	{
		name: "TypeScript",
		slug: "typescript",
		description: "TypeScript言語",
		categories: ["言語"],
	},
	{
		name: "React",
		slug: "react",
		description: "Reactフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "Next.js",
		slug: "nextjs",
		description: "Next.jsフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "NestJS",
		slug: "nestjs",
		description: "NestJSフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "CSS",
		slug: "css",
		description: "CSS技術",
		categories: ["技術"],
	},
	{
		name: "grid",
		slug: "grid",
		description: "CSSグリッドレイアウト",
		categories: ["技術"],
	},
	{
		name: "Cloudflare",
		slug: "cloudflare",
		description: "Cloudflareサービス",
		categories: ["クラウド"],
	},
	{
		name: "Hono",
		slug: "hono",
		description: "Honoフレームワーク",
		categories: ["フレームワーク"],
	},
	{
		name: "AI",
		slug: "ai",
		description: "人工知能全般",
		categories: ["AI"],
	},
	{
		name: "Claude",
		slug: "claude",
		description: "Claude AI",
		categories: ["AI"],
	},
	{
		name: "Claude Code",
		slug: "claude-code",
		description: "Claude Code開発ツール",
		categories: ["AI"],
	},
	{
		name: "モノレポ",
		slug: "monorepo",
		description: "モノレポ管理手法",
		categories: ["技術"],
	},
	{
		name: "moonrepo",
		slug: "moonrepo",
		description: "moonrepoツール",
		categories: ["技術"],
	},
	{
		name: "proto",
		slug: "proto",
		description: "moonのprotoツール",
		categories: ["技術"],
	},
	{
		name: "バージョン管理",
		slug: "version-control",
		description: "バージョン管理システム",
		categories: ["技術"],
	},
	{
		name: "Mac",
		slug: "mac",
		description: "macOSプラットフォーム",
		categories: ["プラットフォーム"],
	},
	{
		name: "技術スタック",
		slug: "tech-stack",
		description: "技術スタック構成",
		categories: ["技術"],
	},
	{
		name: "ヌギー",
		slug: "nugey",
		description: "ヌギー個人に関する内容",
		categories: ["その他"],
	},
];
