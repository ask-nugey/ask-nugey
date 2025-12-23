import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { contract } from "@packages/api-contract";

export type ORPCClient = ContractRouterClient<typeof contract>;

const rpcLink = (baseUrl: string) =>
	new RPCLink({
		url: `${baseUrl}/rpc`,
		headers: () => ({
			Authorization: "Bearer default-token",
		}),
	});

/**
 * @description oRPCクライアントを作成
 */
export const createOrpcClient = (
	baseUrl = "http://localhost:3001"
): ORPCClient => {
	const link = rpcLink(baseUrl);
	return createORPCClient(link);
};

export const createOrpcQuery = (client: ORPCClient) => {
	return createTanstackQueryUtils(client);
};
