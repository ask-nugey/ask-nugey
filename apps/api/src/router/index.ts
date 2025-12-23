import { pub } from "@apps/api/orpc";
import {
	executeAgent,
	executeWeatherWorkflow,
	listAgents,
	listWorkflows,
} from "@apps/api/router/ai-agent";
import { createPlanet, findPlanet, listPlanets, updatePlanet } from "./planet";
import { sse } from "./sse";

export const router = pub.router({
	planet: {
		list: listPlanets,
		create: createPlanet,
		find: findPlanet,
		update: updatePlanet,
	},
	ai: {
		listAgents,
		executeAgent,
		listWorkflows,
		executeWeatherWorkflow,
	},
	sse,
});
