import { createOrpcClient, type ORPCClient } from "@packages/orpc-client";

declare global {
	var $orpc: ORPCClient | undefined;
}

export const orpc: ORPCClient = globalThis.$orpc ?? createOrpcClient();
