import type { PropsWithChildren } from "react";

import { css } from "@/lib/styled-system/css";
import { TocHighlight } from "@/src/ui/components/Toc/TocHighlight";

export const TocCard = ({ children }: PropsWithChildren) => {
	return (
		<aside
			id="articleToc"
			className={css({
				marginTop: 6,

				md: {
					position: "sticky",
					top: 6,
					flex: "none",
					display: "flex",
					justifyContent: "flex-end",
					maxHeight: "100dvh",
					overflowX: "hidden",
					overflowY: "auto",
				},

				"& .is-active": {
					color: "red.400",
					fontWeight: "bold",
				},

				"& nav": {
					mdDown: {
						maxHeight: "300px",
						overflowY: "auto",
					},
				},

				"& ul": {
					width: "100%",
					listStyleType: "disc",
					margin: 0,
					paddingLeft: "1.5em",
					md: {
						maxWidth: "200px",
					},
				},
				"& ul ul": {
					paddingLeft: "1.1em",
				},
				"& li": {
					listStyleType: "disc",
				},
				"& ul ul li": {
					listStyleType: "disc",
				},
				"& ul li a": {
					width: "100%",
					display: "block",
					textDecoration: "none",
					lineHeight: 1.8,
					md: {
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					},
					"&:hover": {
						textDecoration: "underline",
					},
				},
			})}
		>
			<div>
				<p>目次</p>
				<div>
					<TocHighlight>{children}</TocHighlight>
				</div>
			</div>
		</aside>
	);
};
