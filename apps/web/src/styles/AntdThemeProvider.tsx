"use client";

import { ConfigProvider } from "antd";
import ja_JP from "antd/locale/ja_JP";
import type { ReactNode } from "react";
import AntdRegistry from "@/src/styles/AntdRegistry";
import { themeConfig } from "@/src/styles/antdThemeConfig";

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
	<AntdRegistry>
		<ConfigProvider theme={themeConfig} locale={ja_JP}>
			{children}
		</ConfigProvider>
	</AntdRegistry>
);
