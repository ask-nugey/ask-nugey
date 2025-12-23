import { serve } from "@hono/node-server";
import "@apps/api/polyfill";
import { createApp } from "@apps/api/app";

const app = createApp();

// node server
serve(
	{
		fetch: app.fetch,
		port: 3001,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}/api`);
	}
);
