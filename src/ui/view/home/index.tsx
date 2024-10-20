import Image from 'next/image';
import Link from 'next/link';

import { css } from '@/lib/styled-system/css';
import { getAllPosts } from '@/src/app/_actions/posts';
import { PageHomeProps } from '@/src/app/page';
import { Post } from '@/src/types/post';
import { AllPosts } from '@/src/ui/view/home/_index/AllPosts';
import { ThemePosts } from '@/src/ui/view/home/_index/ThemePosts';

export const PageHomeView = async (props: PageHomeProps) => {
	const posts = await getAllPosts();

	/**
	 * **新しい順に並び替えた記事**
	 * - updatedAtが存在する場合はそれを、存在しない場合はcreatedAtを基準に並び替え
	 */
	const sortedPostsByNewest = posts
		.filter((post): post is Post => post !== undefined)
		.sort((postA, postB) => {
			const dateA = new Date(postA.updatedAt ?? postA.createdAt).getTime();
			const dateB = new Date(postB.updatedAt ?? postB.createdAt).getTime();
			return dateB - dateA;
		});

	return (
		<>
			{/* メインビジュアル */}
			<div
				className={css({
					display: 'grid',
					justifyContent: 'center',
					paddingRight: 8,
					overflow: 'hidden',
					mdDown: {
						margin: 4,
						paddingRight: 0,
					},
				})}
			>
				<Image
					alt="ヌギー(nugey)"
					src="/logo.png"
					width={400}
					height={400}
					className={css({
						marginBottom: '-4vw',
						marginLeft: 'auto',
						mdDown: {
							width: '60vw',
							height: '60vw',
							marginBottom: '-10vw',
						},
					})}
				/>
				<p
					className={css({
						color: 'gray.300',
						fontSize: '1.5vw',
						fontWeight: 'bold',
						mdDown: {
							fontSize: '3.6vw',
						},
					})}
				>
					ヌギーにきいて！
					<br
						className={css({
							md: {
								display: 'none',
							},
						})}
					/>
					(なんでもは知らないけど)
				</p>
				<p
					className={css({
						display: 'flex',
						flexWrap: 'wrap',
						columnGap: 4,
						alignItems: 'baseline',
						color: 'primary.500',
						fontWeight: 'bold',
					})}
				>
					<span
						className={css({
							display: 'inline-block',
							color: 'inherit',
							fontSize: '8vw',
							lineHeight: 1.2,
							mdDown: {
								marginTop: 2,
								fontSize: '12vw',
							},
						})}
					>
						Ask Nugey!
					</span>
					<span
						className={css({
							display: 'inline-block',
							color: 'inherit',
							fontSize: '2vw',
							mdDown: {
								fontSize: '5vw',
							},
						})}
					>
						(But it doesn&apos;t know everything)
					</span>
				</p>
			</div>

			{/* タブ */}
			<div
				className={css({
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					marginTop: 8,

					_before: {
						content: '""',
						position: 'absolute',
						bottom: 0,
						right: 0,
						left: 0,
						zIndex: 0,

						height: '1px',
						backgroundColor: '#cfc5ae',
					},
				})}
			>
				<div
					className={css({
						display: 'flex',
						gap: 0.5,
						width: '100%',
						maxWidth: '1200px',
						margin: 'auto',
						paddingInline: 4,
						mdDown: {
							paddingInline: 2,
						},
					})}
				>
					<div
						className={css(
							{
								position: 'relative',
								zIndex: 1,
								color: 'primary.300',
								backgroundColor: 'bg.base',
								border: '1px solid',
								borderColor: '#cfc5ae',
								borderRadius: '16px 16px 0 0',
								fontWeight: 'bold',
								_hover: {
									color: 'primary.500',
								},
							},
							(!props.searchParams.tab || props.searchParams.tab === 'all') && {
								color: 'primary.500',
								borderBottom: 0,
							},
						)}
					>
						<Link
							href="/?tab=all"
							scroll={false}
							className={css({
								display: 'block',
								padding: '8px 16px',
								color: 'inherit',
							})}
						>
							一覧
						</Link>
					</div>
					<div
						className={css(
							{
								position: 'relative',
								zIndex: 1,
								color: 'primary.300',
								backgroundColor: 'bg.base',
								border: '1px solid',
								borderColor: '#cfc5ae',
								borderRadius: '16px 16px 0 0',
								fontWeight: 'bold',
								_hover: {
									color: 'primary.500',
								},
							},
							props.searchParams.tab === 'theme' && {
								color: 'primary.500',
								borderBottom: 0,
							},
						)}
					>
						<Link
							href="/?tab=theme"
							scroll={false}
							className={css({
								display: 'block',
								padding: '8px 16px',
								color: 'inherit',
							})}
						>
							テーマ別
						</Link>
					</div>
				</div>
			</div>

			{/* コンテンツ */}
			<div
				className={css({
					width: '100%%',
					maxWidth: '1200px',
					margin: 'auto',
					paddingInline: 5,
					mdDown: {
						paddingInline: 2,
					},
				})}
			>
				{(!props.searchParams.tab || props.searchParams.tab === 'all') && (
					<AllPosts posts={sortedPostsByNewest} />
				)}

				{props.searchParams.tab === 'theme' && (
					<ThemePosts posts={sortedPostsByNewest} />
				)}
			</div>
		</>
	);
};
