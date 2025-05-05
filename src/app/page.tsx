import { PageHomeView } from '@/src/ui/view/home';

export type PageHomeProps = {
	searchParams: {
		tab?: 'all' | 'theme' | 'zenn' | 'qiita';
	};
};

export default async function PageHome(props: PageHomeProps) {
	return <PageHomeView {...props} />;
}
