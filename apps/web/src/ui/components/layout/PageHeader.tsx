import { css } from "@/lib/styled-system/css";
import { Container } from "@/src/ui/components/layout/Container";

type props = {
	title: string;
	description?: string;
};

export const PageHeader = (props: props) => {
	return (
		<Container
			contentStyles={css.raw({
				pt: "12",
				pb: "6",
			})}
		>
			<h1
				className={css({
					fontSize: { base: "3xl", md: "4xl" },
					fontWeight: "bold",
					mb: "4",
					color: "primary.600",
				})}
			>
				{props.title}
			</h1>
			{props.description && (
				<p
					className={css({
						fontSize: "lg",
						color: "primary.600",
					})}
				>
					{props.description}
				</p>
			)}
		</Container>
	);
};
