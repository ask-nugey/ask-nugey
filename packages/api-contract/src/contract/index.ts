import {
	executeAgent,
	executeWeatherWorkflow,
	listAgents,
	listWorkflows,
} from "./ai-agent";
import { createPlanet, findPlanet, listPlanets, updatePlanet } from "./planet";
import { sse } from "./sse";

export const contract = {
	planet: {
		list: listPlanets,
		create: createPlanet,
		find: findPlanet,
		update: updatePlanet,
	},

	ai: {
		listAgents,
		listWorkflows,
		executeAgent,
		executeWeatherWorkflow,
	},

	sse,
};
