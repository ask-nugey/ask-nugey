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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <MergeProvider items={providers}>{children}</MergeProvider>
      </body>
    </html>
  );
}
