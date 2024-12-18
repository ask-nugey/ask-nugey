import { Tag } from 'antd';
import { format } from 'date-fns';
import Link from 'next/link';

import { css } from '@/lib/styled-system/css';
import { Post } from '@/src/types/post';

type Props = {
	post?: Post;
};

export const PostCard = (props: Props) => {
	if (!props.post) return null;

	return (
		<article
			className={css({
				display: 'grid',
			})}
		>
			<Link
				href={`/posts/${props.post.slug}`}
				className={css({
					display: 'grid',
					gap: 2,
					padding: 6,
					bgColor: 'white',
					border: '1px solid',
					borderColor: 'gray.300',
					borderRadius: '2xl',
					overflow: 'hidden',

					'& h2': {
						textDecoration: 'none',
						whiteSpace: 'break-spaces',
					},
					'&:hover h2': {
						textDecoration: 'underline',
					},
				})}
			>
				<time
					dateTime={props.post.createdAt.toString()}
					className={css({
						display: 'block',
						color: 'gray.400',
					})}
				>
					{format(props.post.createdAt, 'yyyy/MM/d')}
				</time>
				<h2
					className={css({
						color: 'primary.500',
						fontSize: 'xl',
						fontWeight: 'bold',
					})}
				>
					{props.post.title}
				</h2>
				{props.post.description && (
					<div
						className={css({
							color: '#444',
							fontSize: 'md',
						})}
					>
						{props.post.description}
					</div>
				)}
				<div
					className={css({
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
						'& span': {
							fontSize: 'xs',
							lineHeight: '1.6em',
						},
					})}
				>
					{props.post.tags.map(tag => (
						<Tag key={tag} color="gold">
							# {tag}
						</Tag>
					))}
				</div>
			</Link>
		</article>
	);
};
