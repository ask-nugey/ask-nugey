import { os } from "@orpc/server";

export function retry(options: { times: number }) {
	/**
	 * Best practices for dedupe-middlewares
	 * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
	 */
	return os
		.$context<{ canRetry?: boolean }>()
		.middleware(({ context, next }) => {
			const canRetry = context.canRetry ?? true;

			// リトライしない場合は、
			if (!canRetry) {
				// 次のミドルウェアに処理を渡す
				return next();
			}

			// リトライ回数をカウント
			let times = 0;
			while (true) {
				try {
					// 次の処理を実行へ渡すためリトライフラグをfalseにする
					return next({
						context: {
							canRetry: false,
						},
					});
				} catch (e) {
					// リトライ回数が最大値を超えた場合はエラーをスロー
					if (times >= options.times) {
						throw e;
					}

					// リトライ回数をインクリメント
					times++;
				}
			}
		});
}
