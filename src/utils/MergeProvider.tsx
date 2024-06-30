import React, {
	PropsWithChildren,
	ReactNode,
	ReactElement,
	ComponentType,
} from 'react';

// Define a type that expects children to be a required prop
type ComponentWithRequiredChildren = ComponentType<{ children: ReactNode }>;

interface MergeProviderProps {
	items: ComponentWithRequiredChildren[];
}

const MergeProvider = ({
	items,
	children,
}: PropsWithChildren<MergeProviderProps>): ReactElement => {
	const renderProviders = (
		providers: ComponentWithRequiredChildren[],
		content: ReactNode,
	): ReactNode => {
		if (providers.length === 0) {
			return content;
		}

		const [CurrentProvider, ...restProviders] = providers;
		return (
			<CurrentProvider>
				{renderProviders(restProviders, content)}
			</CurrentProvider>
		);
	};

	return <>{renderProviders(items, children)}</>;
};

export default MergeProvider;
