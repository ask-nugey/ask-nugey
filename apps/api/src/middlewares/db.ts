import { os } from "@orpc/server";
import { type DB, db as dbInstance } from "@packages/db";

type DbContextBuilder = ReturnType<typeof os.$context<{ db?: DB }>>;
type DbProviderMiddleware = ReturnType<DbContextBuilder["middleware"]>;

export const dbProviderMiddleware: DbProviderMiddleware = os
	.$context<{ db?: DB }>()
	.middleware(async ({ context, next }) => {
		const db: DB = context.db ?? dbInstance;
		return next({
			context: {
				db,
			},
		});
	});
