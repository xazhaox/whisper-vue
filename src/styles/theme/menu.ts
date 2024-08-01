import { Theme } from "@/hooks/interface";

export const menuTheme: Record<Theme.ThemeType, { [key: string]: string }> = {
  light: {
    "--a-menu-bg-color": "#ffffff",
    "--a-menu-hover-bg-color": "#cccccc",
    "--a-menu-active-bg-color": "var(--a-color-primary-light-9)",
    "--a-menu-text-color": "#333333",
    "--a-menu-active-color": "var(--a-color-primary)",
    "--a-menu-hover-text-color": "#333333",
    "--a-menu-horizontal-sub-item-height": "50px",
    "--a-menu-border-color": "#f2f2f2",
    "--a-menu-border-color-1": "#1d23290d"
  },
  inverted: {
    "--a-menu-bg-color": "#191a20",
    "--a-menu-hover-bg-color": "#000000",
    "--a-menu-active-bg-color": "#000000",
    "--a-menu-text-color": "#bdbdc0",
    "--a-menu-active-color": "#ffffff",
    "--a-menu-hover-text-color": "#ffffff",
    "--a-menu-horizontal-sub-item-height": "50px"
  },
  dark: {
    "--a-menu-bg-color": "#141414",
    "--a-menu-hover-bg-color": "#000000",
    "--a-menu-active-bg-color": "#000000",
    "--a-menu-text-color": "#bdbdc0",
    "--a-menu-active-color": "#ffffff",
    "--a-menu-hover-text-color": "#ffffff",
    "--a-menu-horizontal-sub-item-height": "50px"
  }
};
