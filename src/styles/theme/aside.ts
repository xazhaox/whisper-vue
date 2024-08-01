import { Theme } from "@/hooks/interface";

export const asideTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--a-aside-logo-text-color": "#303133",
    "--a-aside-border-color": "#e4e7ed"
  },
  inverted: {
    "--a-main-logo-text-color": "#ffffff",
    "--a-aside-border-color": "#414243"
  },
  dark: {
    "--a-aside-logo-text-color": "#dadada",
    "--a-aside-border-color": "#414243"
  }
};
