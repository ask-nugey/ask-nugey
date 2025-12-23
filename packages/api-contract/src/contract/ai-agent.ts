import * as z from "zod";
import {
	ExecuteAgentRequestSchema,
	ExecuteAgentResponseBodySchema,
	ExecuteWeatherWorkflowRequestSchema,
	ExecuteWeatherWorkflowResponseBodySchema,
	ListAgentsResponseBodySchema,
	ListWorkflowsResponseBodySchema,
} from "../schemas/ai-agent";
import { ocBase } from "./base";

export const listAgents = ocBase
	.route({
		method: "GET",
		path: "/ai/agents",
		summary: "利用可能なAIエージェント一覧",
		description: "システムで利用可能なAIエージェントの一覧を取得します",
		tags: ["AI Agent"],
	})
	.errors({
		SYSTEM_ERROR: {
			message: "システムエラーが発生しました",
			data: z.object({
				error: z.string(),
			}),
		},
	})
	.output(
		z.object({
			body: ListAgentsResponseBodySchema,
		})
	);

export const listWorkflows = ocBase
	.route({
		method: "GET",
		path: "/ai/workflows",
		summary: "利用可能なワークフロー一覧",
		description: "システムで利用可能なワークフローの一覧を取得します",
		tags: ["AI Agent"],
	})
	.errors({
		SYSTEM_ERROR: {
			message: "システムエラーが発生しました",
			data: z.object({
				error: z.string(),
			}),
		},
	})
	.output(
		z.object({
			body: ListWorkflowsResponseBodySchema,
		})
	);

export const executeAgent = ocBase
	.route({
		method: "POST",
		path: "/ai/agents/{agentId}/execute",
		summary: "AIエージェントを実行",
		description:
			"指定されたAIエージェントにメッセージを送信し、応答を取得します",
		tags: ["AI Agent"],
	})
	.errors({
		AGENT_NOT_FOUND: {
			message: "指定されたエージェントが見つかりません",
			data: z.object({
				agentId: z.string(),
			}),
		},
		INVALID_MESSAGES: {
			message: "メッセージの形式が正しくありません",
			data: z.object({
				reason: z.string(),
			}),
		},
		AGENT_ERROR: {
			message: "AIエージェントの実行中にエラーが発生しました",
			data: z.object({
				error: z.string(),
				agentId: z.string(),
			}),
		},
	})
	.input(ExecuteAgentRequestSchema)
	.output(
		z.object({
			body: ExecuteAgentResponseBodySchema,
		})
	);

export const executeWeatherWorkflow = ocBase
	.route({
		method: "POST",
		path: "/ai/weather-workflow",
		summary: "天気予報ワークフローを実行",
		description: "指定された都市の天気予報を取得し、活動を提案します",
		tags: ["AI Agent"],
	})
	.errors({
		INVALID_CITY: {
			message: "指定された都市が見つかりません",
			data: z.object({
				city: z.string(),
			}),
		},
		WORKFLOW_ERROR: {
			message: "ワークフローの実行中にエラーが発生しました",
			data: z.object({
				error: z.string(),
				step: z.string().optional(),
			}),
		},
		AGENT_ERROR: {
			message: "AIエージェントの実行中にエラーが発生しました",
			data: z.object({
				error: z.string(),
			}),
		},
	})
	.input(ExecuteWeatherWorkflowRequestSchema)
	.output(
		z.object({
			body: ExecuteWeatherWorkflowResponseBodySchema,
		})
	);
