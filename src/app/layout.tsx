import "./globals.css";
import React, { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/styles/AntdThemeProvider";
import { BaseLayout } from "@/ui/components/layout/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ask Nugey",
  description: "",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
