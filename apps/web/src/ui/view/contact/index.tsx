import { css } from "@/lib/styled-system/css";
import { Container } from "@/src/ui/components/layout/Container";
import { PageHeader } from "@/src/ui/components/layout/PageHeader";

export const PageContactView = () => {
	return (
		<>
			<PageHeader
				title="お問い合わせ"
				description="ご質問やご意見をお待ちしております"
			/>

			<Container
				wrapperStyles={css.raw({
					mx: "auto",
					py: "8",
				})}
			>
				<section
					className={css({
						mb: "8",
					})}
				>
					<h2
						className={css({
							fontSize: "2xl",
							fontWeight: "bold",
							mb: "4",
						})}
					>
						お問い合わせについて
					</h2>
					<p
						className={css({
							mb: "4",
						})}
					>
						当サイトへのご質問、ご意見、ご感想などがございましたら、
						お気軽にお問い合わせください。
					</p>
					<p
						className={css({
							mb: "4",
						})}
					>
						技術的な質問、記事の内容に関するフィードバック、
						その他のご要望などをお待ちしております。
					</p>
				</section>

				<section
					className={css({
						mb: "8",
					})}
				>
					<h2
						className={css({
							fontSize: "2xl",
							fontWeight: "bold",
							mb: "4",
						})}
					>
						お問い合わせ方法
					</h2>
					<div
						className={css({
							bg: "gray.50",
							p: "6",
							borderRadius: "lg",
							border: "1px solid",
							borderColor: "gray.200",
						})}
					>
						<p
							className={css({
								mb: "4",
							})}
						>
							お問い合わせする際は以下のXのアカウントへDMでご連絡ください。
						</p>
						<a
							href="https://x.com/ask_nugey"
							target="_blank"
							rel="noopener noreferrer"
							className={css({
								color: "blue.600",
								textDecoration: "underline",
								_hover: {
									color: "blue.800",
								},
							})}
						>
							@ask_nugey
						</a>
					</div>
				</section>
			</Container>
		</>
	);
};
