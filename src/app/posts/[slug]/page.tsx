import { notFound } from 'next/navigation';

import { getPostMeta, postSlugs } from '@/src/app/posts/_utils';
import { PostDetailView } from '@/src/ui/view/posts/detail';

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams() {
	return postSlugs.map(slug => ({
		slug,
	}));
}

export default function Page(props: Props) {
	const { slug } = props.params;
	const meta = getPostMeta(slug);

	if (!meta) notFound();

	return <PostDetailView slug={slug} meta={meta!} />;
}
