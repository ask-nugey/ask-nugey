import { mastra } from "@apps/ai-agent";
import { retry } from "@apps/api/middlewares/retry";
import { pub } from "@apps/api/orpc";

export const listAgents = pub
	.use(retry({ times: 3 }))
	.ai.listAgents.handler(async ({ errors }) => {
		try {
			// Mastraから利用可能なエージェント一覧を取得
			// 注: Mastraの実装によってはgetAgents()などのメソッドが必要
			const agents = [
				{
					id: "weatherAgent",
					name: "天気エージェント",
					description: "天気情報に基づいて活動を提案するエージェント",
				},
			];

			return {
				body: {
					data: agents,
					meta: {
						requestId: crypto.randomUUID(),
						timestamp: new Date().toISOString(),
					},
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				throw errors.SYSTEM_ERROR({
					data: { error: error.message },
				});
			}
			throw errors.SYSTEM_ERROR({
				data: { error: "エージェント一覧の取得中にエラーが発生しました" },
			});
		}
	});

export const executeAgent = pub
	.use(retry({ times: 2 }))
	.ai.executeAgent.handler(async ({ input, errors }) => {
		try {
			const agent = mastra.getAgent(input.params.agentId);

			if (!agent) {
				throw errors.AGENT_NOT_FOUND({
					data: { agentId: input.params.agentId },
				});
			}

			const result = await agent.generate(input.body.messages);

			return {
				body: {
					data: { response: result.text },
					meta: {
						requestId: crypto.randomUUID(),
						timestamp: new Date().toISOString(),
					},
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				throw errors.AGENT_ERROR({
					data: {
						error: error.message,
						agentId: input.params.agentId,
					},
				});
			}
			throw errors.AGENT_ERROR({
				data: {
					error: "予期しないエラーが発生しました",
					agentId: input.params.agentId,
				},
			});
		}
	});

export const listWorkflows = pub
	.use(retry({ times: 3 }))
	.ai.listWorkflows.handler(async ({ errors }) => {
		try {
			// Mastraから利用可能なワークフロー一覧を取得
			const workflows = [
				{
					id: "weatherWorkflow",
					name: "天気予報ワークフロー",
					description: "都市名から天気予報を取得し、活動を提案します",
					inputSchema: {
						city: {
							type: "string",
							description: "天気を取得する都市名",
						},
					},
				},
			];

			return {
				body: {
					data: workflows,
					meta: {
						requestId: crypto.randomUUID(),
						timestamp: new Date().toISOString(),
					},
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				throw errors.SYSTEM_ERROR({
					data: { error: error.message },
				});
			}
			throw errors.SYSTEM_ERROR({
				data: { error: "ワークフロー一覧の取得中にエラーが発生しました" },
			});
		}
	});

export const executeWeatherWorkflow = pub
	.use(retry({ times: 2 }))
	.ai.executeWeatherWorkflow.handler(async ({ input, errors }) => {
		try {
			const run = await mastra.getWorkflow("weatherWorkflow").createRunAsync();
			if (!run) {
				throw errors.WORKFLOW_ERROR({
					data: {
						error: "weatherWorkflowが見つかりません",
					},
				});
			}

			const output = await run.start({
				inputData: { city: input.body.city },
			});

			if (!output || output.status !== "success") {
				throw errors.WORKFLOW_ERROR({
					data: {
						error: "ワークフローの実行結果が取得できませんでした",
					},
				});
			}

			return {
				body: {
					data: {
						activities: output.result.activities,
					},
					meta: {
						requestId: crypto.randomUUID(),
						timestamp: new Date().toISOString(),
					},
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes("not found")) {
					throw errors.INVALID_CITY({
						data: { city: input.body.city },
					});
				}
				throw errors.WORKFLOW_ERROR({
					data: {
						error: error.message,
					},
				});
			}
			throw errors.WORKFLOW_ERROR({
				data: {
					error: "予期しないエラーが発生しました",
				},
			});
		}
	});
