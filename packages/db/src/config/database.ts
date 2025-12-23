import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../schema";

type Environment = "development" | "production" | "test" | "local";

export const getDbConfig = () => {
	const rawNodeEnv = process.env.NODE_ENV;
	const nodeEnv = (rawNodeEnv || "local") as Environment;
	const databaseUrl = process.env.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error(`🔥 DATABASE_URL is not set for environment: ${nodeEnv}`);
	}

	// ローカル環境の場合
	if (nodeEnv === "local" || !rawNodeEnv) {
		return {
			client: createClient({
				url: databaseUrl,
			}),
			config: {
				url: databaseUrl,
				authToken: undefined,
			},
		};
	}

	// Turso環境（開発・本番）の場合
	const authToken = process.env.DATABASE_AUTH_TOKEN;
	if (!authToken) {
		throw new Error(
			`🔥 DATABASE_AUTH_TOKEN is required for environment: ${nodeEnv}`
		);
	}

	return {
		client: createClient({
			url: databaseUrl,
			authToken: authToken,
		}),
		config: {
			url: databaseUrl,
			authToken: authToken,
		},
	};
};

// データベースインスタンスの作成
export const createDatabase = () => {
	const { client } = getDbConfig();
	return drizzle(client, { schema });
};
