// リクエスト共通（パラメータ・クエリ・ボディ・ヘッダ）
export type ApiRequest<P = unknown, Q = unknown, B = unknown, H = unknown> = {
	params?: P;
	query?: Q;
	body?: B;
	headers?: H; // 認証トークンやカスタムヘッダ
};

// レスポンス共通（成功/失敗・メタ）
export type ApiResponse<T> = {
	data: T;
	meta?: {
		requestId?: string;
		timestamp?: string; // ISO8601 推奨
	};
};

// ページング型（offset/limit 版）
export type Pagination = {
	totalCount: number;
	limit: number;
	offset: number;
	currentPage?: number;
	totalPages?: number;
};

// 一覧系だけ拡張
export type ApiResponseWithPagination<T> = ApiResponse<T> & {
	pagination: Pagination;
};
