import { PageHomeView } from '@/src/ui/view/home';

export type PageHomeProps = {
	searchParams: {
		tab?: 'all' | 'theme';
	};
};

const PageHome = function PageHome(props: PageHomeProps) {
	return <PageHomeView {...props} />;
};

export default PageHome;
