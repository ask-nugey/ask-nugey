import { os } from "@orpc/server";
import type { NewPlanet, Planet, UpdatePlanet } from "@packages/api-contract";

export interface PlanetDB {
	planets: {
		find: (id: number) => Promise<Planet | undefined>;
		list: (limit: number, cursor: number) => Promise<Planet[]>;
		create: (newPlanet: NewPlanet) => Promise<Planet>;
		update: (updatePlanet: UpdatePlanet) => Promise<Planet>;
	};
}

/**
 * Best practices for dedupe-middlewares
 * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
 */
export const planetDbProviderMiddleware = os
	.$context<{ planetDb?: PlanetDB }>()
	.middleware(async ({ context, next }) => {
		/**
		 * Why we should ?? here?
		 * Because it can avoid `createFakePlanetDB` being called when unnecessary.
		 * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
		 */
		const planetDb: PlanetDB = context.planetDb ?? createFakePlanetDB();

		return next({
			context: {
				planetDb,
			},
		});
	});

const planets: Planet[] = [
	{
		id: 1,
		name: "Earth",
		description: "The planet Earth",
		imageUrl: "https://picsum.photos/200/300",
	},
	{
		id: 2,
		name: "Mars",
		description: "The planet Mars",
		imageUrl: "https://picsum.photos/200/300",
	},
	{
		id: 3,
		name: "Jupiter",
		description: "The planet Jupiter",
		imageUrl: "https://picsum.photos/200/300",
	},
];

export function createFakePlanetDB(): PlanetDB {
	return {
		planets: {
			find: async (id) => {
				return planets.find((planet) => planet.id === id);
			},
			list: async (limit: number, cursor: number) => {
				return planets.slice(cursor, cursor + limit);
			},
			create: async (newPlanet) => {
				const id = planets.length + 1;
				const imageUrl = newPlanet.image
					? `https://example.com/cdn/${newPlanet.image.name}`
					: undefined;

				const planet: Planet = {
					id,
					name: newPlanet.name,
					description: newPlanet.description,
					imageUrl,
				};

				planets.push(planet);

				return planet;
			},
			update: async (planet) => {
				const index = planets.findIndex((p) => p.id === planet.id);

				if (index === -1) {
					throw new Error("Planet not found");
				}

				planets[index] = {
					...planets[index],
					...planet,
					imageUrl: planet.image
						? `https://example.com/cdn/${planet.image.name}`
						: planets[index].imageUrl,
				};

				return planets[index];
			},
		},
	};
}
