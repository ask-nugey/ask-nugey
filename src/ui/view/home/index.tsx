import Image from 'next/image';

import { css } from '@/lib/styled-system/css';
import { getAllPosts } from '@/src/app/_actions/posts';
import { Post } from '@/src/types/post';
import { PostCard } from '@/src/ui/components/PostCard';

export const PageHomeView = async () => {
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

			<div
				className={css({
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: 4,
					marginTop: 16,
					marginInline: 4,

					'& div': {
						md: {
							maxWidth: '100%',
							width: 320,
						},
						mdDown: {
							width: 'calc(100% - 16px)',
						},
					},
				})}
			>
				{sortedPostsByNewest.map(post => (
					<PostCard key={post?.slug} post={post} />
				))}
			</div>
		</>
	);
};
