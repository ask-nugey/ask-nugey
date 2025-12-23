import * as process from "node:process";
import { router } from "@apps/api/router";
import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import {
	NewPlanetBodySchema,
	PlanetSchema,
	UpdatePlanetBodySchema,
} from "@packages/api-contract";
import dotenv from "dotenv";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// 環境変数を読み込む
dotenv.config();

// Honoアプリ設定
type App = {
	Bindings: Env;
	// Variables: Variables;
};

// CORS設定
type CorsOptions = Parameters<typeof cors>[0];

const RpcCorsOptions: CorsOptions = {
	origin:
		process.env.NODE_ENV === "production" ? process.env.CORS_ORIGINS : "*",
	allowHeaders: ["Content-Type", "Authorization"],
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	exposeHeaders: ["Content-Type", "Authorization"],
	maxAge: 600,
};

// ハンドラー設定
const createOpenAPIHandler = () =>
	new OpenAPIHandler(router, {
		interceptors: [
			onError((error) => {
				console.error(error);
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
						title: "ORPC API",
						version: "1.0.0",
					},
					servers: [
						{
							url: process.env.API_URL ?? "http://localhost:3001/api",
						},
					],
					commonSchemas: {
						Planet: { schema: PlanetSchema },
						NewPlanet: { schema: NewPlanetBodySchema },
						UpdatePlanet: { schema: UpdatePlanetBodySchema },
						UndefinedError: { error: "UndefinedError" },
					},
					security: [],
					components: {},
				},
				docsConfig: {
					authentication: {
						securitySchemes: {
							bearerAuth: {
								token: "default-token",
							},
						},
					},
				},
			}),
		],
	});

const createRPCHandler = () =>
	new RPCHandler(router, {
		interceptors: [
			onError((error) => {
				console.error(error);
			}),
		],
	});

export const createApp = () => {
	const app = new Hono<App>();

	app.use(logger());

	const openAPIHandler = createOpenAPIHandler();
	const rpcHandler = createRPCHandler();

	const BODY_PARSER_METHODS = new Set([
		"arrayBuffer",
		"blob",
		"formData",
		"json",
		"text",
	] as const);
	type BodyParserMethod = typeof BODY_PARSER_METHODS extends Set<infer T>
		? T
		: never;

	// 本番環境のみ /api のBasic認証を有効化
	if (process.env.NODE_ENV === "production") {
		app.use(
			"/api/*",
			basicAuth({
				username: process.env.BASIC_AUTH_USERNAME ?? "",
				password: process.env.BASIC_AUTH_PASSWORD ?? "",
			})
		);
	}
	app.all("/api/*", async (c) => {
		const request = new Proxy(c.req.raw, {
			get(target, prop) {
				if (BODY_PARSER_METHODS.has(prop as BodyParserMethod)) {
					return () => c.req[prop as BodyParserMethod]();
				}
				return Reflect.get(target, prop, target);
			},
		});

		const { matched, response } = await openAPIHandler.handle(request, {
			prefix: "/api",
			context: {},
		});

		if (matched) return c.newResponse(response.body, response);

		return c.notFound();
	});

	app.use("/rpc/*", cors(RpcCorsOptions));
	app.all("/rpc/*", async (c, next) => {
		// 本番環境ではドメインチェックを行う
		if (process.env.NODE_ENV === "production" && !checkDomain(c.req.raw)) {
			return c.notFound();
		}

		const request = new Proxy(c.req.raw, {
			get(target, prop) {
				if (BODY_PARSER_METHODS.has(prop as BodyParserMethod)) {
					return () => c.req[prop as BodyParserMethod]();
				}
				return Reflect.get(target, prop, target);
			},
		});

		const { matched, response } = await rpcHandler.handle(request, {
			prefix: "/rpc",
			context: {},
		});

		if (matched) return c.newResponse(response.body, response);

		await next();

		return c.notFound();
	});

	app.get("/health", (c) => {
		return c.text("OK");
	});

	app.all("*", (c) => {
		return c.notFound();
	});

	return app;
};

// utils
const checkDomain = (req: Request) => {
	const origin = req.headers.get("origin") || req.headers.get("referer");
	if (!origin) return false;

	const domain = new URL(origin).origin;
	return process.env.CORS_ORIGINS?.includes(domain) ?? false;
};
