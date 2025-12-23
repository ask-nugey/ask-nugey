import { z } from "zod";

/**
 * ApiRequestのzodスキーマを作成する関数
 * @param options スキーマ作成のオプション
 * @returns ApiRequestに対応するzodスキーマ
 */
export const createApiRequestSchema = <
	P extends z.ZodTypeAny | undefined = undefined,
	Q extends z.ZodTypeAny | undefined = undefined,
	B extends z.ZodTypeAny | undefined = undefined,
	H extends z.ZodTypeAny | undefined = undefined,
>(options?: {
	params?: P;
	query?: Q;
	body?: B;
	headers?: H;
}) => {
	const baseObject: Record<string, z.ZodTypeAny> = {};

	// 指定されたフィールドのみを追加
	if (options?.params !== undefined) baseObject.params = options.params;
	if (options?.query !== undefined) baseObject.query = options.query;
	if (options?.body !== undefined) baseObject.body = options.body;
	if (options?.headers !== undefined) baseObject.headers = options.headers;

	return z.object(baseObject) as z.ZodObject<{
		params: P extends z.ZodTypeAny ? P : never;
		query: Q extends z.ZodTypeAny ? Q : never;
		body: B extends z.ZodTypeAny ? B : never;
		headers: H extends z.ZodTypeAny ? H : never;
	}>;
};

/**
 * ApiResponseのzodスキーマを作成する関数
 * @param dataSchema データ部分のスキーマ
 * @returns ApiResponseに対応するzodスキーマ
 */
export const createApiResponseBodySchema = <T extends z.ZodTypeAny>(
	dataSchema: T
) => {
	return z.object({
		data: dataSchema,
		meta: z
			.object({
				requestId: z.string().optional(),
				timestamp: z.string().optional(),
			})
			.optional(),
	});
};

/**
 * Paginationのzodスキーマ
 */
const PaginationSchema = z.object({
	totalCount: z.number(),
	limit: z.number(),
	offset: z.number(),
	currentPage: z.number().optional(),
	totalPages: z.number().optional(),
});

/**
 * ApiResponseWithPaginationのzodスキーマを作成する関数
 * @param dataSchema データ部分のスキーマ
 * @returns ApiResponseWithPaginationに対応するzodスキーマ
 */
export const createApiResponseBodyWithPaginationSchema = <
	T extends z.ZodTypeAny,
>(
	dataSchema: T
) => {
	return z.object({
		data: dataSchema,
		meta: z
			.object({
				requestId: z.string().optional(),
				timestamp: z.string().optional(),
			})
			.optional(),
		pagination: PaginationSchema,
	});
};
