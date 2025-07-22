import { PropsWithChildren } from 'react';

import { css } from '@/lib/styled-system/css';
import { SystemStyleObject } from '@/lib/styled-system/types';

type Props = {
	wrapperStyles?: SystemStyleObject;
	contentStyles?: SystemStyleObject;
} & PropsWithChildren;

/**
 * レイアウト用のコンテナーコンポーネント
 *
 * 外側のラッパーと内側のコンテンツ領域にスタイルを適用可能
 *
 * 使用例：
 * ```tsx
 * <Container
 *   wrapperStyles={css.raw({ bg: 'red' })}
 *   contentStyles={css.raw({ color: 'white' })}
 * >
 *   コンテンツ
 * </Container>
 * ```
 */
export const Container = (props: Props) => {
	return (
		<div
			className={css({
				px: { base: '64px', mdDown: '12px' },
				...props.wrapperStyles,
			})}
		>
			<div
				className={css({
					maxWidth: 1024,
					mx: 'auto',
					...props.contentStyles,
				})}
			>
				{props.children}
			</div>
		</div>
	);
};
