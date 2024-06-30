import { Divider } from 'antd';
import { Route } from 'next';
import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';

export const MdxComponents: MDXComponents = {
	a: ({ href, children }) => <Link href={href as Route}>{children}</Link>,
	hr: () => <Divider />,
};
