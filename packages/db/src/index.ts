import path from "node:path";
import { config } from "dotenv";
// import { config } from "dotenv-flow";
import { createDatabase } from "./config/database";

// 環境に応じた.envファイルをロード
const env = process.env.NODE_ENV || "local";
const envPath = path.resolve(
	path.dirname(new URL(import.meta.url).pathname),
	`../.env${!process.env.NODE_ENV ? "" : `.${env}`}`
);
config({ path: envPath });

// config({
// 	node_env: process.env.NODE_ENV,
// 	default_node_env: "local",
// 	path: "..",
// });

console.log("🔥 process.env.NODE_ENV:");
console.log(process.env.NODE_ENV);

// データベースインスタンスをエクスポート
export const db = createDatabase();
export type DB = typeof db;

// Re-export config utilities
export { getDbConfig } from "./config/database";

// Re-export schema
export * from "./schema";
