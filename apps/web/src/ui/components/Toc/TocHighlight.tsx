"use client";

import type { FC, JSX, PropsWithChildren, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { useIntersectionObserver } from "@/src/ui/components/Toc/useIntersectionObserver";

interface IIntersectionObserverProps {
	headingsToObserve?: string;
	rootMargin?: string;
	threshold?: number;
}

export type TocHighlightProps = PropsWithChildren<IIntersectionObserverProps>;

interface IChildProps extends PropsWithChildren {
	className?: string;
	href: string;
	children: ReactNode;
}

type ValidAnchorElement = ReactNode & IChildProps;

export const TocHighlight: FC<TocHighlightProps> = (props): JSX.Element => {
	const { headingsToObserve, rootMargin, threshold } = props;

	const tocHeadingsToObserve = headingsToObserve ?? "h2, h3, h4";
	const tocRootMargin = rootMargin ?? "-10% 0px -40% 0px";
	const tocThreshold = threshold ?? 1;

	const children = Children.toArray(props.children);

	function recursiveChildren(
		children: ReactNode[],
		activeIdState: string
	): ReactNode {
		const newChildren = Children.map(children, (child) => {
			let clonedChild: ReactNode = child;

			if (isValidElement<ValidAnchorElement>(child)) {
				const children = Children.toArray(child.props.children);

				clonedChild = cloneElement(child, {
					children: recursiveChildren(children, activeIdState),
				});

				if ("href" in child.props) {
					if (
						child.props.href.substring(1) === encodeURIComponent(activeIdState)
					) {
						clonedChild = cloneElement(child, {
							className: child.props.className
								? `${child.props.className} is-active`
								: "is-active",
						});
					}
				}
			}

			return clonedChild;
		});

		return newChildren;
	}

	// the second part is the rootMargin string of the IntersectionObserver
	// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
	const { activeIdState } = useIntersectionObserver(
		tocHeadingsToObserve,
		tocRootMargin,
		tocThreshold
	);

	return <>{recursiveChildren(children, activeIdState)}</>;
};
