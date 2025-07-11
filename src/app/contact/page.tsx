import { PageContactView } from '@/src/ui/view/contact';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'お問い合わせ | ask-nugey',
	description:
		'ask-nugeyへのお問い合わせページです。ご質問やご意見をお待ちしております。',
};

const PageContact = function PageContact() {
	return <PageContactView />;
};

export default PageContact;
