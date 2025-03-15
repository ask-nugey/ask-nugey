import { Metadata } from 'next';

import { siteConfig } from '@/src/constants';
import { PageAiOcrView } from '@/src/ui/view/aiOcr';

const page = {
	title: 'AIでPDFをテキスト変換くん',
	description: 'PDFをマークダウン形式に変換する無料アプリ',
};

export const metadata: Metadata = {
	title: page?.title,
	description: page?.description,
	openGraph: {
		title: `${page?.title} | ${siteConfig.name}`,
		description: `${page?.description} | ${siteConfig.name}`,
		images: [
			{
				url: `https://${siteConfig.domain}/opengraph-image.png`,
			},
		],
	},
	twitter: {
		title: `${page?.title} | ${siteConfig.name}`,
		description: `${page?.description} | ${siteConfig.name}`,
		images: [
			{
				url: `https://${siteConfig.domain}/opengraph-image.png`,
			},
		],
	},
	alternates: {
		canonical: `https://${siteConfig.domain}/ai-ocr`,
	},
};

const PageAiOcr = function PageAiOcr() {
	return <PageAiOcrView />;
};

export default PageAiOcr;
