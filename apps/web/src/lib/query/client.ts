import {
	defaultShouldDehydrateQuery,
	QueryClient,
} from "@tanstack/react-query";
import { serializer } from "@/src/lib/query/serializer";

/**
 * react-query-ssr が内部で dehydrate/hydrate
 * ここで QueryClient の defaultOptions に「シリアライズ/デシリアライズの拡張」を仕込んでおくと、
 * SSR 埋め込み時もその設定が効きます（v5の仕様）。
 */
export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// SSR→CSRで即座に再フェッチさせないため>0を推奨
				staleTime: 60_000,
			},
			dehydrate: {
				// streamingでpending中も含めたいなら true にする
				shouldDehydrateQuery: (q) =>
					defaultShouldDehydrateQuery(q) || q.state.status === "pending",
				serializeData: (data) => {
					try {
						const [json, meta] = serializer.serialize(data);
						return { json, meta };
					} catch (error) {
						console.error("Serialization error:", error);
						// フォールバック: 元のデータをそのまま返す
						return { json: data, meta: null };
					}
				},
			},
			hydrate: {
				deserializeData: (data) => {
					try {
						// react-query-ssr は <script> に JSON を埋めます。
						// ここで oRPC のメタ情報を使って復元。
						// 型アサーションは埋め込み形に合わせて最小限に。
						type SerializeReturn = ReturnType<typeof serializer.serialize>;
						type Meta = SerializeReturn[1];

						const d = data as { json: unknown; meta: Meta };
						return serializer.deserialize(d.json, d.meta);
					} catch (error) {
						console.error("Deserialization error:", error);
						// フォールバック: 元のデータをそのまま返す
						return (data as { json?: unknown }).json || data;
					}
				},
			},
		},
	});
