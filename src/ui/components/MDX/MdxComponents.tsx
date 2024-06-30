import { Divider } from 'antd';
import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';


export const MdxComponents: MDXComponents = {
	a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
	hr: () => <Divider />,
};
