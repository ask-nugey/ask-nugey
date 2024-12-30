import { HomeFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

import { css } from '@/lib/styled-system/css';
import { Post } from '@/src/types/post';
import { CommentCard } from '@/src/ui/components/CommentCard';

type Props = {
	post: Post;
};

export const PostDetailView = (props: Props) => {
	const PostContent = dynamic(
		() => import(`/src/post/${props.post.slug}/content.mdx`),
	);

	return (
		<div
			className={css({
				display: 'grid',
				gap: 2,

				maxWidth: 1024,
				width: 'calc(100% - 16px)',
				margin: ' 1rem auto',
				padding: 8,
				backgroundColor: 'white',
				border: '1px solid',
				borderColor: 'gray.200',
				borderRadius: 'xl',

				mdDown: {
					padding: 4,
				},

				"& h2:not([id='目次'])": {
					marginTop: 6,
					padding: 4,
					color: 'white',
					fontSize: 'xl',
					fontWeight: 'bold',
					backgroundColor: 'primary.500',
					borderRadius: 'xl',
					'& a': {
						color: 'inherit',
					},
				},

				'& h3': {
					marginTop: 4,
					color: 'primary.500',
					fontSize: '2xl',
					fontWeight: 'bold',
					'& a': {
						color: 'inherit',
					},
				},

				'& h4': {
					marginTop: 4,
					color: '#333',
					fontSize: 'xl',
					fontWeight: 'bold',
					'& a': {
						color: 'inherit',
					},
				},

				"& h2[id='目次'] a": {
					color: '#333',
					fontSize: 'xl',
					textDecoration: 'none',
				},
				"& h2[id='目次'] + ul": {
					listStyleType: 'disc',
					margin: 0,
					paddingLeft: '1.5em',
				},
				"& h2[id='目次'] + ul ul": {
					paddingLeft: '1.1em',
				},
				"& h2[id='目次'] li": {
					padding: '5px 0',
					listStyleType: 'disc',
				},
				"& h2[id='目次'] + ul ul li": {
					listStyleType: 'disc',
				},
				"& h2[id='目次'] + ul li a": {
					color: '#333',
					textDecoration: 'none',
					lineHeight: 1.8,
					'&:hover': {
						textDecoration: 'underline',
					},
				},

				'& pre': {
					borderRadius: 'xl',
				},
				'& ul, & ol': {
					paddingLeft: '1.5em',
				},
				'& ul li': {
					listStyleType: 'disc',
				},
				'& ol li': {
					listStyleType: 'decimal',
				},

				'& p img': {
					marginTop: 4,
					marginBottom: 6,

				},

				'& table': {
					width: 'max-content',
					fontSize: '0.875rem', // text-sm
					textAlign: 'left',
					color: '#555',
					overflowX: 'auto',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-md
					borderRadius: '0.5rem', // sm:rounded-lg

					mdDown: {
						width: '100%',
					},
				},

				'& thead': {
					fontSize: '0.875rem', // text-sm
					color: '#374151', // text-gray-700
					backgroundColor: '#f9fafb', // bg-gray-50
				},

				'& th': {
					paddingLeft: '1.5rem', // px-6
					paddingRight: '1.5rem', // px-6
					paddingTop: '0.75rem', // py-3
					paddingBottom: '0.75rem', // py-3
				},

				'& tr': {
					borderBottom: '1px solid #e5e7eb', // border-b
				},

				'& td': {
					paddingLeft: '1.5rem', // px-6
					paddingRight: '1.5rem', // px-6
					paddingTop: '0.75rem', // py-3
					paddingBottom: '0.75rem', // py-3
				},
			})}
		>
			<time
				dateTime={props.post.createdAt.toDateString()}
				className={css({
					display: 'block',
					color: 'gray.400',
				})}
			>
				{format(props.post.createdAt, 'yyyy/MM/d')}
			</time>
			<h1
				className={css({
					fontSize: '3xl',
					fontWeight: 'bold',
				})}
			>
				{props.post.title}
			</h1>
			<div
				className={css({
					display: 'flex',
					flexWrap: 'wrap',
					marginBottom: 4,
				})}
			>
				{props.post.tags.map(tag => (
					<Tag key={tag} color="gold">
						# {tag}
					</Tag>
				))}
			</div>
			<PostContent />
			<div
				className={css({
					display: 'grid',
					gap: 4,
					marginTop: 8,
					marginBottom: 4,
					marginInline: 'auto',
				})}
			>
				<a
					href="https://marshmallow-qa.com/bw99ezhmow42xg9"
					target="_blank"
					rel="noreferrer"
				>
					<Button
						type="primary"
						icon={<QuestionCircleFilled />}
						className={css({
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							fontWeight: 'bold',
						})}
					>
						Ask Nugey!（マシュマロで質問）
					</Button>
				</a>
				<a href="/">
					<Button
						type="primary"
						icon={<HomeFilled />}
						className={css({
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							fontWeight: 'bold',
						})}
					>
						トップに戻る
					</Button>
				</a>
			</div>
			<CommentCard />
		</div>
	);
};
