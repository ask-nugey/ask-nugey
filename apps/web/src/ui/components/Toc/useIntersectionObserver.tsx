import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (
	querySelector: string,
	rootMargin: string,
	threshold: number
) => {
	const [activeIdState, setActiveIdState] = useState("");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const handleObserver = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveIdState(entry.target.id);
				}
			}
		};

		if (typeof observerRef !== "undefined") {
			observerRef.current = new IntersectionObserver(handleObserver, {
				rootMargin,
				threshold,
			});

			const elements = document.querySelectorAll(querySelector);

			for (const elem of elements) {
				if (observerRef.current === null) return;
				observerRef.current.observe(elem);
			}
		}

		return () => {
			observerRef.current?.disconnect();
		};
	}, [querySelector, rootMargin, threshold]);

	return { activeIdState };
};
