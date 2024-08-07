'use client';

import { ConfigProvider } from 'antd';
import ja_JP from 'antd/locale/ja_JP';
import { ReactNode } from 'react';

import { themeConfig } from '@/src/styles/antdThemeConfig';

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
	<ConfigProvider theme={themeConfig} locale={ja_JP}>
		{children}
	</ConfigProvider>
);
