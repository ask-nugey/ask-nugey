"use client";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { PropsWithChildren } from "react";

const { Header, Content, Footer } = Layout;

const MenuItems: MenuItemType[] = [
  { key: 1, label: "メニュー1" },
  { key: 2, label: "メニュー2" },
];

const BreadcrumbItems = [
  { title: "Home" },
  { title: "List" },
  { title: "App" },
];

export const BaseLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        // ヘッダー固定
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="logo">Logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={MenuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb items={BreadcrumbItems} style={{ margin: "16px 0" }} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ask Nugey ©{new Date().getFullYear()} Created by Nugey
      </Footer>
    </Layout>
  );
};
