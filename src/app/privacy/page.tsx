import { PagePrivacyView } from '@/src/ui/view/privacy';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'プライバシーポリシー | ask-nugey',
	description: 'ask-nugeyのプライバシーポリシーについて説明します。',
};

const PagePrivacy = function PagePrivacy() {
	return <PagePrivacyView />;
};

export default PagePrivacy;
