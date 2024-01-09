import "./globals.css";
import React, { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/styles/AntdThemeProvider";
import { BaseLayout } from "@/ui/components/layout/BaseLayout";
import MergeProvider from "@/utils/MergeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ask Nugey",
  description: "",
};

const providers = [AntdRegistry, ThemeProvider, BaseLayout];

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MergeProvider items={providers}>{children}</MergeProvider>
      </body>
    </html>
  );
}
