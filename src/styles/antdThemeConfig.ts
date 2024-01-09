import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#eabc04",
    borderRadius: 16,
  },
  components: {
    Layout: {
      headerBg: "#ffffff",
    },
    Menu: {
      itemColor: "#ffffff",
      darkItemBg: "#ffffff",
    },
  },
};
