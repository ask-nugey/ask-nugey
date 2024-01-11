import "./globals.css";
import React, { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/styles/AntdThemeProvider";
import { BaseLayout } from "@/src/ui/components/layout/BaseLayout";
import MergeProvider from "@/src/utils/MergeProvider";
import { AntdRegistry } from "@/lib/nextjs-registry/es";

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
