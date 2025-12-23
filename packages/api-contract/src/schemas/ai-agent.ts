import { AgentsIds } from "@apps/ai-agent";
import * as z from "zod";
import {
	createApiRequestSchema,
	createApiResponseBodySchema,
} from "../api/schema";

// // 天気予報レスポンスのスキーマ
// const WeatherForecastSchema = z.object({
// 	date: z.string(),
// 	maxTemp: z.number(),
// 	minTemp: z.number(),
// 	precipitationChance: z.number(),
// 	condition: z.string(),
// 	location: z.string(),
// });

// ワークフロー実行用のスキーマ
const ExecuteWeatherWorkflowBodySchema = z.object({
	city: z.string().min(1).describe("天気を取得する都市名"),
});

export const ExecuteWeatherWorkflowRequestSchema = createApiRequestSchema({
	body: ExecuteWeatherWorkflowBodySchema,
});

// アクティビティ提案レスポンスのスキーマ
const WeatherActivitiesDataSchema = z.object({
	activities: z.string().describe("天気に基づく活動提案"),
});

export const ExecuteWeatherWorkflowResponseBodySchema =
	createApiResponseBodySchema(WeatherActivitiesDataSchema);

// エージェント実行用のスキーマ
const ExecuteAgentParamsSchema = z.object({
	agentId: z.enum(AgentsIds).describe("実行するエージェントのID"),
});

const ExecuteAgentBodySchema = z.object({
	messages: z
		.array(
			z.object({
				role: z.enum(["user", "assistant", "system"]),
				content: z.string(),
			})
		)
		.min(1)
		.describe("エージェントに送信するメッセージ"),
});

export const ExecuteAgentRequestSchema = createApiRequestSchema({
	params: ExecuteAgentParamsSchema,
	body: ExecuteAgentBodySchema,
});

// エージェント実行レスポンスのスキーマ
const ExecuteAgentResponseDataSchema = z.object({
	response: z.string().describe("エージェントからの応答"),
});

export const ExecuteAgentResponseBodySchema = createApiResponseBodySchema(
	ExecuteAgentResponseDataSchema
);

// エージェント情報のスキーマ
const AgentInfoSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});

export const ListAgentsResponseBodySchema = createApiResponseBodySchema(
	z.array(AgentInfoSchema)
);

// ワークフロー情報のスキーマ
const WorkflowInfoSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	inputSchema: z.record(z.string(), z.unknown()).optional(),
});

export const ListWorkflowsResponseBodySchema = createApiResponseBodySchema(
	z.array(WorkflowInfoSchema)
);
