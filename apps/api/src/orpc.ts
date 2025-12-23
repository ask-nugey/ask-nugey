import { dbProviderMiddleware } from "@apps/api/middlewares/db";
import { planetDbProviderMiddleware } from "@apps/api/middlewares/planetDb";
import { implement } from "@orpc/server";
import { contract } from "@packages/api-contract";

export const pub = implement(contract)
	.use(dbProviderMiddleware)
	.use(planetDbProviderMiddleware);

// 認証用
// export const authed = pub.use(({ context, next }) => {
//   ~~~
// })
