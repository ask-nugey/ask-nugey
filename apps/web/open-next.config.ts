import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

const config: ReturnType<typeof defineCloudflareConfig> =
	defineCloudflareConfig({
		incrementalCache: kvIncrementalCache,
	});

export default config;
