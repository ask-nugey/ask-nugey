import type { Env, ExecutionContext } from "hono";
import { createApp } from "./app";
import "@apps/api/polyfill";

const app = createApp();

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return app.fetch(request, env, ctx);
	},
};
