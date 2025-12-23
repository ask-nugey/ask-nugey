import * as z from "zod";
import {
	CreatePlanetRequestSchema,
	FindPlanetRequestSchema,
	ListPlanetsRequestSchema,
	PlanetResponseBodySchema,
	PlanetsListResponseBodySchema,
	UpdatePlanetRequestSchema,
} from "../schemas/planet";
import { ocBase } from "./base";

export const listPlanets = ocBase
	.route({
		method: "GET",
		path: "/planets",
		summary: "List all planets",
		tags: ["Planets"],
	})
	.errors({
		INVALID_PAGINATION: {
			message: "Invalid pagination parameters",
			data: z.object({
				limit: z.number().optional(),
				cursor: z.number().optional(),
			}),
		},
	})
	.input(ListPlanetsRequestSchema)
	.output(
		z.object({
			body: PlanetsListResponseBodySchema,
		})
	);

export const createPlanet = ocBase
	.route({
		method: "POST",
		path: "/planets",
		summary: "Create a planet",
		tags: ["Planets"],
	})
	.errors({
		VALIDATION_ERROR: {
			message: "Invalid input data",
			data: z.object({
				field: z.string(),
				reason: z.string(),
			}),
		},
		DUPLICATE_NAME: {
			message: "Planet with this name already exists",
			data: z.object({ name: z.string() }),
		},
	})
	.input(CreatePlanetRequestSchema)
	.output(
		z.object({
			body: PlanetResponseBodySchema,
		})
	);

export const findPlanet = ocBase
	.route({
		method: "GET",
		path: "/planets/{id}",
		summary: "Find a planet",
		tags: ["Planets"],
	})
	.errors({
		NOT_FOUND: {
			message: "Planet not found",
			data: z.object({ id: z.number().int().min(1) }),
		},
		INVALID_ID: {
			message: "Invalid planet ID",
			data: z.object({ id: z.number() }),
		},
	})
	.input(FindPlanetRequestSchema)
	.output(
		z.object({
			body: PlanetResponseBodySchema,
		})
	);

export const updatePlanet = ocBase
	.route({
		method: "PUT",
		path: "/planets/{id}",
		summary: "Update a planet",
		tags: ["Planets"],
	})
	.errors({
		NOT_FOUND: {
			message: "Planet not found",
			data: z.object({ id: z.number().int().min(1) }),
		},
	})
	.input(UpdatePlanetRequestSchema)
	.output(
		z.object({
			body: PlanetResponseBodySchema,
		})
	);
