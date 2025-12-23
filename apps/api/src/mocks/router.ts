import { pub } from "@apps/api/orpc";

export const mockRouter = pub.router({
	planet: {
		list: pub.planet.list.handler(async () => {
			return {
				body: {
					data: [
						{
							id: 1,
							name: "Earth",
							description: "Home planet",
						},
					],
				},
			};
		}),
		create: pub.planet.create.handler(async () => {
			return {
				body: {
					data: { id: 1, name: "Earth", description: "Home planet" },
				},
			};
		}),
		find: pub.planet.find.handler(async () => {
			return {
				body: {
					data: { id: 1, name: "Earth", description: "Home planet" },
				},
			};
		}),
		update: pub.planet.find.handler(async () => {
			return {
				body: {
					data: { id: 1, name: "Earth", description: "Home planet" },
				},
			};
		}),
	},
	ai: {
		listAgents: pub.ai.listAgents.handler(async () => {
			return {
				body: {
					data: [
						{
							id: "weatherAgent",
							name: "天気エージェント",
							description: "天気情報に基づいて活動を提案するエージェント",
						},
					],
				},
			};
		}),
		executeAgent: pub.ai.executeAgent.handler(async () => {
			return {
				body: {
					data: { response: "test" },
				},
			};
		}),
		listWorkflows: pub.ai.listWorkflows.handler(async () => {
			return {
				body: {
					data: [
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
					],
				},
			};
		}),
		executeWeatherWorkflow: pub.ai.executeWeatherWorkflow.handler(async () => {
			return {
				body: {
					data: { activities: "test" },
				},
			};
		}),
	},
	sse: pub.sse.handler(async function* () {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}),
});
