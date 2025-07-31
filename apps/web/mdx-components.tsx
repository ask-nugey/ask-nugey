import { MdxComponents } from "@/src/ui/components/MDX/MdxComponents";
import type { MDXComponents } from "mdx/types";

// MDXをApp Routerで動かすには mdx-components.tsx を next.config.mjs と同じ階層に設置する必要がある
// 参考リンク: https://nextjs.org/docs/app/building-your-application/configuring/mdx#getting-started
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		...MdxComponents,
	};
}
