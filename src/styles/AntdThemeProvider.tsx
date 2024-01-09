"use client";

import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/styles/antdThemeConfig";

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
);
