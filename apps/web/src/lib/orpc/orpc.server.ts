import "server-only";

import { createOrpcClient, type ORPCClient } from "@packages/orpc-client";

// NOTE: サーバー側では、
declare global {
	var $orpc: ORPCClient | undefined;
}

if (!globalThis.$orpc) {
	globalThis.$orpc = createOrpcClient();
}
