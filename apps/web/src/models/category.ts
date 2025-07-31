export type CategoryName =
	| "言語"
	| "フレームワーク"
	| "技術"
	| "クラウド"
	| "AI"
	| "プラットフォーム"
	| "その他";

export type Category = {
	name: CategoryName;
	description: string;
};

export const categories: Category[] = [
	{
		name: "言語",
		description: "プログラミング言語",
	},
	{
		name: "フレームワーク",
		description: "開発フレームワーク・ライブラリ",
	},
	{
		name: "技術",
		description: "技術・手法・概念",
	},
	{
		name: "クラウド",
		description: "クラウドサービス・プラットフォーム",
	},
	{
		name: "AI",
		description: "人工知能・機械学習",
	},
	{
		name: "プラットフォーム",
		description: "OS・プラットフォーム",
	},
	{
		name: "その他",
		description: "その他のトピック",
	},
];
