import { isDefinedError } from "@orpc/client";
import { createOrpcQuery } from "@packages/orpc-client";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

const orpcQuery = createOrpcQuery();

const query = useInfiniteQuery(
	orpcQuery.planet.list.infiniteOptions({
		input: (pageParam: number) => ({
			query: {
				limit: 10,
				cursor: pageParam,
			},
		}),
		getNextPageParam: (lastPage) => {
			const planets = lastPage.body.data;
			if (planets.length === 0) return undefined;
			return planets[planets.length - 1]?.id ?? undefined;
		},
		initialPageParam: 0,
	})
);

const queryClient = useQueryClient();

const mutation = useMutation(
	orpcQuery.planet.update.mutationOptions({
		onError(error) {
			if (isDefinedError(error)) {
				const id = error.data.id;
				//    ^    type-safe
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: orpcQuery.planet.key(),
			});
		},
	})
);
