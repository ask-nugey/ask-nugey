import { css } from '@/lib/styled-system/css';
import { Post } from '@/src/types/post';
import { PostCard } from '@/src/ui/components/PostCard';

type Props = {
	posts: Post[];
};

export const AllPosts = (props: Props) => {
	return (
		<div
			className={css({
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
				justifyContent: 'center',
				alignItems: 'stretch',
				gap: 3,
				marginTop: 4,
				mdDown: {
					marginTop: 3,
					gap: 1.5,
				},

				'& div': {
					maxWidth: '100%',
				},
			})}
		>
			{props.posts.map(post => (
				<PostCard key={post?.slug} post={post} />
			))}
		</div>
	);
};
