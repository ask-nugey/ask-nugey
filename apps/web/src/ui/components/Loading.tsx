'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';
import { PropsWithChildren } from 'react';

import { css } from '@/lib/styled-system/css';
import { SystemStyleObject } from '@/lib/styled-system/types';

type tipMessage = '　Loading...' | '読み込み中' | (string & {});

type Props = {
	tip?: tipMessage;
	wrapperStyles?: SystemStyleObject;
} & Pick<SpinProps, 'fullscreen'> &
	PropsWithChildren;

export const Loading = (props: Props) => {
	return (
		<div
			className={css({
				display: 'grid',
				gap: 2,
				w: '100%',
				mx: 'auto',
				p: 4,
				...props.wrapperStyles,
			})}
		>
			<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}>
				{props.children}
			</Spin>
			{props.tip && (
				<span
					className={css({
						mx: 'auto',
						color: 'primary.500',
						fontSize: 'sm',
					})}
				>
					{props.tip}
				</span>
			)}
		</div>
	);
};
