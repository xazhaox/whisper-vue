import { Theme } from "@/hooks/interface";

export const headerTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--a-header-logo-text-color": "#303133",
    "--a-header-bg-color": "#ffffff",
    "--a-header-text-color": "#303133",
    "--a-header-text-color-regular": "#606266",
    "--a-header-border-color": "#e4e7ed",
    "--a-un-ring-offset-shadow": "0 0 rgb(0 0 0 / 0)",
    "--a-un-ring-shadow": "0 0 rgb(0 0 0 / 0)",
    "--a-header-box-shadow": "0 1px 2px rgb(0, 21, 41, 0.08)"
  },
  inverted: {
    "--a-header-logo-text-color": "#dadada",
    "--a-header-bg-color": "#191a20",
    "--a-header-text-color": "#e5eaf3",
    "--a-header-text-color-regular": "#cfd3dc",
    "--a-header-border-color": "#414243"
  },
  dark: {
    "--a-header-logo-text-color": "#dadada",
    "--a-header-bg-color": "#141414",
    "--a-header-text-color": "#e5eaf3",
    "--a-header-text-color-regular": "#cfd3dc",
    "--a-header-border-color": "#414243"
  }
};
