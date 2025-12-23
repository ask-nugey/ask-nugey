import * as z from "zod";
import {
	createApiRequestSchema,
	createApiResponseBodySchema,
} from "../api/schema";

// 基本データスキーマ
export const PlanetSchema = z.object({
	id: z.number().int().min(1),
	name: z.string(),
	description: z.string().optional(),
	imageUrl: z.url().optional(),
});

export const NewPlanetBodySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	image: z
		.file()
		.mime([
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/svg+xml",
			"image/gif",
		])
		.optional(),
});

const UpdatePlanetParamsSchema = z.object({
	id: z.number().int().min(1),
});

export const UpdatePlanetBodySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	image: z
		.file()
		.mime([
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/svg+xml",
			"image/gif",
		])
		.optional(),
});

const ListPlanetsQuerySchema = z.object({
	limit: z.number().int().min(1).max(100).default(10),
	cursor: z.number().int().min(0).default(0),
});

const FindPlanetParamsSchema = z.object({
	id: z.number().int().min(1),
});

// リクエストスキーマ
export const CreatePlanetRequestSchema = createApiRequestSchema({
	body: NewPlanetBodySchema,
});

export const ListPlanetsRequestSchema = createApiRequestSchema({
	query: ListPlanetsQuerySchema,
});

export const FindPlanetRequestSchema = createApiRequestSchema({
	params: FindPlanetParamsSchema,
});

export const UpdatePlanetRequestSchema = createApiRequestSchema({
	params: UpdatePlanetParamsSchema,
	body: UpdatePlanetBodySchema,
});

// レスポンススキーマ
export const PlanetResponseBodySchema =
	createApiResponseBodySchema(PlanetSchema);

export const PlanetsListResponseBodySchema = createApiResponseBodySchema(
	z.array(PlanetSchema)
);

// 型定義のエクスポート
export type Planet = z.infer<typeof PlanetSchema>;
export type NewPlanet = z.infer<typeof NewPlanetBodySchema>;
export type UpdatePlanet = z.infer<typeof UpdatePlanetBodySchema>;
