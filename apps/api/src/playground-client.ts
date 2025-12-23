import { safe } from "@orpc/client";
import { createOrpcClient } from "@packages/orpc-client";

const orpcClient = createOrpcClient();

console.log("\n=== パターン1: 正常系 ===");
const [error, planet, isDefined] = await safe(
	orpcClient.planet.create({
		body: { name: "Earth", description: "The planet Earth" },
	})
);

if (!error) console.log("PLANET", planet);

console.log("\n=== パターン2: 異常系 ===");
const [error2, planet2, isDefined2] = await safe(
	orpcClient.planet.find({
		params: { id: 999999 },
	})
);

if (error2) {
	if (isDefined2) {
		// Contract定義済みエラー（例：NOT_FOUND）
		console.log("🔥Error code:", error2.code); // 'NOT_FOUND'
		console.log("🔥Error status:", error2.status); // '404'
		console.log("🔥Error message:", error2.message); // 'Planet not found'
		console.log("🔥Error data:", error2.data); // (型安全)
	} else {
		// その他のエラー（ネットワークエラーなど）
		console.log("🔥Unknown error:", error);
	}
}
