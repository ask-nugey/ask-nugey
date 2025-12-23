import { oc } from "@orpc/contract";

/**
 * oRPCの基本設定
 * inputStructure: 'detailed' により params/query/headers/body を分離して受け取る
 * outputStructure: 'detailed' により status/headers/body を分離して返す
 */
export const ocBase = oc.$route({
	inputStructure: "detailed",
	outputStructure: "detailed",
});
