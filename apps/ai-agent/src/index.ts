import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { weatherAgent } from "./agents/weather-agent";
import { weatherWorkflow } from "./workflows/weather-workflow";

export const mastra = new Mastra({
	workflows: {
		weatherWorkflow,
	},
	agents: {
		weatherAgent,
	},
	// storage: new LibSQLStore({
	// 	// stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
	// 	url: ":memory:",
	// }),
	logger: new PinoLogger({
		name: "Mastra",
		level: "info",
	}),
});

export type Agents = keyof ReturnType<typeof mastra.getAgents>;
export const AgentsIds = Object.keys(mastra.getAgents()) as Agents[];
