import { css } from '@/lib/styled-system/css';
import { getOGPData } from '@/src/app/_actions/getOGPData';

type Props = {
	url?: string;
};

export const LinkCard = async (props: Props) => {
	if (!props.url) return null;

	// TODO: 内部リンクの場合は、getPostBySlug関数で情報を取得
	const ogp = await getOGPData(props.url);
	return (
		<div
			className={css({
				maxWidth: 720,
				border: '1px solid rgba(187, 140, 92, .2)',
				borderRadius: 10,
				overflow: 'hidden',
				transition: 'all .1s ease',
				_hover: {
					borderColor: 'primary.200',
					boxShadow: 'xs',
				},
			})}
		>
			<a
				href={ogp.url}
				target="_blank"
				rel="noopener noreferrer"
				className={css({
					display: 'flex',
					alignItems: 'center',
					height: 120,
					color: 'gray.600',
					fontSize: 16.5,
					background: 'white',
					lineHeight: '1.5',
					transition: '.2s',
				})}
			>
				<div
					className={css({
						display: 'grid',
						flex: '1 1',
						gap: 1,
						paddingBlock: 2,
						paddingInline: 5,
						minWidth: 0,
					})}
				>
					<h6
						className={css({
							display: '-webkit-box',
							color: 'gray.800',
							fontSize: 16,
							fontWeight: 'bold',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 2,
						})}
					>
						{ogp.title}
					</h6>
					<p
						className={css({
							display: '-webkit-box',
							color: 'gray.500',
							fontSize: 14,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 1,
						})}
					>
						{ogp.description}
					</p>
					<p
						className={css({
							display: '-webkit-box',
							color: 'gray.800',
							fontSize: 12,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 1,
						})}
					>
						{/* TODO: https〜〜などを除去 */}
						{/* TODO: ファビコンを付ける */}
						<span>{ogp.url}</span>
					</p>
				</div>
				{ogp.image && (
					<div
						className={css({
							height: 120,
							maxWidth: 230,
							smDown: {
								width: 120,
							},
						})}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={ogp.image}
							alt={ogp.title}
							className={css({
								width: '100%',
								height: '100%',
								objectFit: 'contain',
								smDown: {
									objectFit: 'cover',
								},
							})}
						/>
					</div>
				)}
			</a>
		</div>
	);
};
