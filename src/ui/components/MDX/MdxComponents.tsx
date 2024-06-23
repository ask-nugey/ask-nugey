import type { MDXComponents } from "mdx/types";

import Link from "next/link";
import { Divider } from "antd";

export const MdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  hr: () => <Divider />,
};
