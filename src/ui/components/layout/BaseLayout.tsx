'use client';

import { createFromIconfontCN } from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { css } from '@/lib/styled-system/css';

const { Header, Content, Footer } = Layout;

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const MenuItems: MenuItemType[] = [
	{
		key: '/author',
		label: '',
		// icon: <SmileTwoTone twoToneColor="#d97706" />,
	},
];
const SnsItems = [
	{
		key: 'https://twitter.com/ask_nugey',
		icon: (
			<IconFont
				type="icon-twitter"
				className={css({ '& svg': { fill: 'sky.400' } })}
			/>
		),
	},
	{
		key: 'https://github.com/ask-nugey',
		icon: <GithubOutlined className={css({ '& svg': { fill: 'black' } })} />,
	},
];

export const BaseLayout = ({ children }: PropsWithChildren) => {
	// const [current, setCurrent] = useState('');
	// const router = useRouter();

	return (
		<Layout
			className={css({
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto',
				width: '100vw',
				minHeight: '100vh',
				overflow: 'auto',
			})}
		>
			<Header
				className={css({
					width: '100%',
					// boxShadow:
					//   `0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
					borderBottom: '1px solid',
					borderColor: 'gray.200',

					smDown: {
						padding: '0 8px',
					},
				})}
			>
				<div
					className={css({
						display: 'flex',
						alignItems: 'center',

						maxWidth: 1024,
						height: 'inherit',
						marginInline: 'auto',
					})}
				>
					<Link
						href="/"
						className={css({
							display: 'grid',
							gridTemplateColumns: 'auto 1fr',
							gap: 2,
							alignItems: 'center',

							color: 'primary.600',
							fontSize: 'xl',
							fontWeight: 'bold',
						})}
					>
						<Image alt="ヌギー(nugey)" src="/logo.png" width={56} height={56} />
						Ask Nugey
					</Link>
					<Menu
						mode="horizontal"
						// onClick={(e) => {
						//   setCurrent(e.key);
						//   router.push(e.key);
						// }}
						// selectedKeys={[current]}
						items={MenuItems}
						className={css({
							flex: 1,
							justifyContent: 'flex-end',
							minWidth: 0,
							borderWidth: 0,
							'& li': {
								display: 'flex',
								justifySelf: 'center',
								alignItems: 'center',
								color: 'primary.500',
								fontWeight: 'bold',
							},
						})}
					/>
					<div
						className={css({
							display: 'flex',
						})}
					>
						{SnsItems.map(item => (
							<a
								key={item.key}
								href={item.key}
								target="_blank"
								className={css({
									padding: 2,
									fontSize: 'lg',
									transition: 'all 0.1s ease',
									_hover: {
										transform: 'scale(1.2)',
									},
								})}
							>
								{item.icon}
							</a>
						))}
					</div>
				</div>
			</Header>
			<Content>{children}</Content>
			<Footer className={css({ color: 'primary.500', textAlign: 'center' })}>
				Ask Nugey ©{new Date().getFullYear()} Created by Nugey
			</Footer>
		</Layout>
	);
};
