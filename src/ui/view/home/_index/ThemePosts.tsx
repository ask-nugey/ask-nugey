import { css } from '@/lib/styled-system/css';
import { Post } from '@/src/types/post';
import { ArticleNode, themes } from '@/src/sitemap/contents';
import Link from 'next/link';

type Props = {
	posts: Post[];
};

export const ThemePosts = (props: Props) => {
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
			})}
		>
			{themes.filter(hasValidArticles).map(item => (
				<ThemeItem key={item.theme} themeItem={item} posts={props.posts} />
			))}
		</div>
	);
};

type ThemeItemProps = {
	themeItem: ArticleNode;
	posts: Post[];
};
const ThemeItem = ({ themeItem, posts }: ThemeItemProps) => {
	return (
		<div
			className={css({
				padding: 2,
				bgColor: 'white',
				border: '1px solid',
				borderColor: 'gray.300',
				borderRadius: 'xl',

				'& ul': {
					marginTop: 1.5,
				},
				'& ul + div': {
					marginTop: 2.5,
				},
			})}
		>
			{themeItem.articles.length > 0 && (
				<>
					<p
						className={css({
							fontSize: 'sm',
						})}
					>
						[ {themeItem.theme} ]
					</p>
					<ul>
						{themeItem.articles.map(article => (
							<li
								key={article}
								className={css({
									marginLeft: '1.5em',
									listStyle: 'circle',
									lineHeight: '1.4',
									'& + li': {
										marginTop: 2,
									},
								})}
							>
								<Link
									href={`/posts/${article}`}
									className={css({
										display: 'inline-flex',
										color: 'primary.500',
										fontWeight: 'bold',
										textDecoration: 'none',
										_hover: {
											textDecoration: 'underline',
										},
									})}
								>
									{posts.find(post => post.slug === article)?.title || article}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
			{themeItem.children.filter(hasValidArticles).map(child => (
				<ThemeItem key={child.theme} themeItem={child} posts={posts} />
			))}
		</div>
	);
};

const hasValidArticles = (themeItem: ArticleNode): boolean =>
	themeItem.articles.length > 0 || themeItem.children.some(hasValidArticles);
