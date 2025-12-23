import { retry } from "@apps/api/middlewares/retry";
import { pub } from "@apps/api/orpc";

export const listPlanets = pub
	.use(retry({ times: 3 }))
	.planet.list.handler(async ({ input, context }) => {
		const planets = await context.planetDb.planets.list(
			input.query.limit,
			input.query.cursor
		);

		console.log("🔥 listPlanets:");
		console.log(planets);

		return {
			body: {
				data: planets,
				meta: {
					requestId: crypto.randomUUID(),
					timestamp: new Date().toISOString(),
				},
			},
		};
	});

export const createPlanet = pub.planet.create.handler(
	async ({ input, context }) => {
		const planet = await context.planetDb.planets.create(input.body);
		return {
			body: {
				data: planet,
				meta: {
					requestId: crypto.randomUUID(),
					timestamp: new Date().toISOString(),
				},
			},
		};
	}
);

export const findPlanet = pub
	.use(retry({ times: 3 }))
	.planet.find.handler(async ({ input, context, errors }) => {
		const planet = await context.planetDb.planets.find(input.params.id);

		if (!planet) {
			throw errors.NOT_FOUND({ data: { id: input.params.id } });
		}

		return {
			body: {
				data: planet,
				meta: {
					requestId: crypto.randomUUID(),
					timestamp: new Date().toISOString(),
				},
			},
		};
	});

export const updatePlanet = pub.planet.update.handler(
	async ({ input, context, errors }) => {
		const planet = await context.planetDb.planets.find(input.params.id);

		if (!planet) {
			/**
			 * Type-Safe Error Handling
			 *
			 * {@link https://orpc.unnoq.com/docs/error-handling#type%E2%80%90safe-error-handling}
			 */
			throw errors.NOT_FOUND({ data: { id: input.params.id } });
		}

		const updatedPlanet = await context.planetDb.planets.update({
			...input.body,
		});

		return {
			body: {
				data: updatedPlanet,
				meta: {
					requestId: crypto.randomUUID(),
					timestamp: new Date().toISOString(),
				},
			},
		};
	}
);
