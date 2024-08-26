import { Theme } from "@/hooks/interface";

export const contentTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--a-border-color-light": "#e4e7ed",
    "--a-main-content-bg-color": "#ffffff",
    "--a-layout-content-bg-color": "#f7fafc",
    "--a-layout-footer-bg-color": "#ffffff",
    "--a-common-font-color": "#71717a",
    "--a-login-from-color": "#e84a6c"
  },
  inverted: {},
  dark: {}
};
