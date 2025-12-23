"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "@/src/lib/query/client";
import { SSRProvider } from "@/src/lib/query/querySsr";

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => createQueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<SSRProvider>{children}</SSRProvider>
		</QueryClientProvider>
	);
}
