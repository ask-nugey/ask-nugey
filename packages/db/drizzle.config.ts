import { config } from "dotenv";
import type { Config } from "drizzle-kit";
import { getDbConfig } from "./src/config/database";

// 環境に応じた.envファイルをロード
const env = (process.env.NODE_ENV as "local" | "dev" | "prod") || "local";
config({ path: `.env.${env}` });

const { config: dbConfig } = getDbConfig();

// ローカル環境用の設定
const localConfig: Config = {
	schema: "./src/schema/**/*.ts",
	out: "./migrations",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: dbConfig.url,
	},
};

// Turso環境用の設定
const tursoConfig: Config = {
	schema: "./src/schema/**/*.ts",
	out: "./migrations",
	dialect: "turso",
	dbCredentials: {
		url: dbConfig.url,
		authToken: dbConfig.authToken,
	},
};

// 環境に応じて設定を切り替え
export default env === "local" ? localConfig : tursoConfig;
