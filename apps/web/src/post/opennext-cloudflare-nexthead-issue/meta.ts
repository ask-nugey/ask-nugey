import type { PostMeta } from "@/src/types/post";

export const meta: PostMeta = {
	title: "OpenNextでのNext.jsをデプロイすると起きるnext/headの問題と解決策",
	description:
		"Next.jsのページルーターでCloudflareデプロイ時のnext/headのSSR問題とincrementalCache設定について解説します。",
	createdAt: new Date("2025-05-02"),
	// updatedAt: new Date("2024-01-01"),
	tags: ["Next.js", "Cloudflare", "OpenNext"],
};
