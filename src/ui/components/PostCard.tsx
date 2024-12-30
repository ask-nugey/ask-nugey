import { UrlObject } from 'url';

import { BlockOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { format } from 'date-fns';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { css } from '@/lib/styled-system/css';
import { Post } from '@/src/types/post';

type Props = {
	post?: Post;
};

export const PostCard = (props: Props) => {
	if (!props.post) return null;

	const link = (() => {
		switch (props.post?.host) {
			case 'zenn':
				return { pathname: `https://zenn.dev/${props.post.slug}` } as UrlObject;
			case 'qiita':
				return { pathname: props.post.slug } as UrlObject;
			default:
				return `/posts/${props.post.slug}` as Route<string>;
		}
	})();


	return (
		<article
			className={css({
				display: 'grid',
			})}
		>
			<Link
				href={link}
				target={props.post?.host && '_blank'}
				rel={props.post?.host && 'noopener noreferrer'}
				className={css({
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					padding: 6,
					bgColor: 'white',
					border: '1px solid',
					borderColor: 'gray.300',
					borderRadius: '2xl',
					overflow: 'hidden',
					transition: 'all .2s ease',
					_hover: {
						borderColor: 'primary.400',
						boxShadow: 'md'
					},

					'& h2': {
						textDecoration: 'none',
						whiteSpace: 'break-spaces',
					},
					'&:hover h2': {
						textDecoration: 'underline',
					},
				})}
			>
				<header
					className={css({
						display: 'flex',
						alignItems: 'center',
						gap: 2,
					})}
				>
					{!props.post?.host && (
						<div
							className={css({
								width: '20px',
								height: '20px',
								padding: '2px',
								borderRadius: '100%',
								border: '1px solid',
								borderColor: 'primary.500',
								overflow: 'hidden',
							})}
						>
							<Image
								width={20}
								height={20}
								src="/icon-nu.png"
								alt='Ask Nugey'
							/>
						</div>
					)}

					{props.post?.host === 'zenn' && (
						<div
							className={css({
								width: '20px',
								height: '20px',
							})}
						>
							<img src='https://static.zenn.studio/images/icon.png' alt='zenn' />
						</div>
					)}

					{props.post?.host === 'qiita' && (
						<div
							className={css({
								width: '18px',
								height: '18px',
							})}
						>
							<img src='https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico' alt='qiita' />
						</div>
					)}

					<time
						dateTime={props.post.createdAt.toString()}
						className={css({
							display: 'block',
							color: 'gray.400',
						})}
					>
						{props.post.updatedAt ? format(props.post.updatedAt, 'yyyy/MM/d') : format(props.post.createdAt, 'yyyy/MM/d')}
					</time>

					{props.post?.host && (
						<BlockOutlined
							className={css({
								marginLeft: 'auto',
								opacity: 0.7
							})}
						/>
					)}

				</header>
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
						gap: 2,
						'& span': {
							fontSize: 'xs',
							lineHeight: '1.6em',
						},
					})}
				>
					{props.post.tags.map(tag => (
						<Tag key={tag} color='gold'
							className={css({ margin: 0 })}
						>
							# {tag}
						</Tag>
					))}
				</div>
			</Link>
		</article >
	);
};
