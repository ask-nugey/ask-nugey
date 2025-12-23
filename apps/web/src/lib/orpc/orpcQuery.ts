import { createOrpcQuery } from "@packages/orpc-client";
import { orpc } from "@/src/lib/orpc/orpc";

// NOTE: queryProvider.tsxを前提としている
export const orpcQuery = createOrpcQuery(orpc);
