import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorBgBase: "#faf9f7",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorLink: "#1677ff",
    colorPrimary: "#f59e0b",
    colorSuccess: "#52c41a",
    colorTextBase: "#333",
    colorWarning: "#faad14",
    colorBgLayout: "#faf9f7",
    borderRadius: 16,
  },
  components: {
    Layout: {
      headerBg: "#faf9f7",
    },
    Menu: {
      // itemColor: "#ffffff",
      // darkItemBg: "#f1eee7",
    },
  },
};
