import { createServer } from "node:http";
import { mockRouter } from "@apps/api/mocks/router";
import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import "@apps/api/polyfill";

const openAPIHandler = new OpenAPIHandler(mockRouter, {
	interceptors: [
		onError((error) => {
			console.error("[Mock Server Error]", error);
		}),
	],
	plugins: [
		new SmartCoercionPlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
			specGenerateOptions: {
				info: {
					title: "ORPC Mock Server",
					version: "1.0.0",
				},
				security: [],
				components: {},
			},
		}),
	],
});

const rpcHandler = new RPCHandler(mockRouter, {
	interceptors: [
		onError((error) => {
			console.error("[Mock Server Error]", error);
		}),
	],
});

const server = createServer(async (req, res) => {
	// CORSヘッダーを追加（開発環境用）
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// OPTIONSリクエストの処理
	if (req.method === "OPTIONS") {
		res.statusCode = 200;
		res.end();
		return;
	}

	const api = await openAPIHandler.handle(req, res, {
		prefix: "/api",
	});

	if (api.matched) {
		return;
	}

	const rpc = await rpcHandler.handle(req, res, {
		prefix: "/rpc",
	});

	if (rpc.matched) {
		return;
	}

	res.statusCode = 404;
	res.end("Not found");
});

const PORT = Number.parseInt(process.env.MOCK_PORT || "3001", 10);

server.listen(PORT, () => {
	console.log("Mock Server is running");
	console.log(`   API Playground: http://localhost:${PORT}/api`);
	console.log(`   RPC Endpoint:   http://localhost:${PORT}/rpc`);
});
