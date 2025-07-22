'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

import { css } from '@/lib/styled-system/css';
import { SystemStyleObject } from '@/lib/styled-system/types';
import { GOOGLE_ADSENSE_ID } from '@/src/constants';

type GoogleAdProps = {
	slotId?: string;
	format?: string;
	layout?: string;
	responsive?: boolean;
	styles?: SystemStyleObject;
};

export const GoogleAd = ({
	slotId = '8765796708',
	format = 'fluid',
	layout = 'in-article',
	responsive = true,
	styles,
}: GoogleAdProps) => {
	const adRef = useRef<HTMLDivElement>(null);

	let pathname = usePathname();
	pathname = pathname ? pathname : '';

	useLayoutEffect(() => {
		// 広告スクリプトが読み込まれるまで待機
		const checkAndLoadAd = () => {
			if (
				typeof window !== 'undefined' &&
				// @ts-expect-error Google AdSenseのwindow.adsbygoogleは型定義がないため
				window.adsbygoogle &&
				adRef.current
			) {
				const ins = adRef.current.querySelector('ins.adsbygoogle');

				// 既に広告が読み込まれているかチェック
				if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
					try {
						console.log('Loading ad for slot:', slotId);
						// @ts-expect-error Google AdSenseのwindow.adsbygoogleは型定義がないため
						(window.adsbygoogle = window.adsbygoogle || []).push({});
					} catch (error) {
						console.error('AdSense error:', error);
					}
				}
			}
		};

		// スクリプトの読み込みを待つ
		if (document.readyState === 'complete') {
			checkAndLoadAd();
		} else {
			window.addEventListener('load', checkAndLoadAd);
			return () => window.removeEventListener('load', checkAndLoadAd);
		}
	}, [slotId]);
	return (
		<div
			className={css({ ...styles })}
			key={pathname.replace(/\//g, '-') + '-' + slotId}
			ref={adRef}
		>
			<ins
				className={
					'adsbygoogle ' +
					css({
						display: 'block',
						width: '100%',
					})
				}
				data-ad-client={`ca-pub-${GOOGLE_ADSENSE_ID}`}
				data-ad-slot={slotId}
				data-ad-format={format}
				data-ad-layout={layout}
				data-full-width-responsive={`${responsive}`}
			/>
		</div>
	);
};
