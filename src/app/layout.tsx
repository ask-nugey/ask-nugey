import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

import AntdRegistry from '@/lib/nextjs-registry/AntdRegistry';
import { siteConfig } from '@/src/constants';
import { ThemeProvider } from '@/src/styles/AntdThemeProvider';
import { BaseLayout } from '@/src/ui/components/layout/BaseLayout';
import MergeProvider from '@/src/utils/MergeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL(`https://${siteConfig.domain}`),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: `https://${siteConfig.domain}`,
		siteName: siteConfig.name,
		locale: 'ja_JP',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		site: '@ask_nugey',
		creator: '@ask_nugey',
	},
	// verification: {
	//   google: "サーチコンソール",
	// },
	alternates: {
		canonical: `https://${siteConfig.domain}`,
	},
};

const providers = [AntdRegistry, ThemeProvider, BaseLayout];

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ja">
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
					integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={inter.className}>
				<MergeProvider items={providers}>{children}</MergeProvider>
			</body>
		</html>
	);
}
