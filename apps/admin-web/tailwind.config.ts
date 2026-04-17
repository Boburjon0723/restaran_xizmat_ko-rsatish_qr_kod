import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      "colors": {
        "tertiary-fixed-dim": "#92ccff",
        "tertiary-container": "#207ab3",
        "surface-variant": "#e3e2e1",
        "error-container": "#ffdad6",
        "tertiary": "#006193",
        "surface-tint": "#a23f00",
        "primary-container": "#c64f00",
        "primary": "#9e3d00",
        "background": "#faf9f8",
        "on-secondary-container": "#526478",
        "surface-container-high": "#e9e8e7",
        "on-error": "#ffffff",
        "secondary-fixed-dim": "#b5c8df",
        "error": "#ba1a1a",
        "on-surface": "#1a1c1c",
        "on-secondary-fixed": "#091d2e",
        "surface-bright": "#faf9f8",
        "secondary-container": "#cfe2f9",
        "surface-dim": "#dadad9",
        "surface-container-highest": "#e3e2e1",
        "outline-variant": "#e0c0b2",
        "on-surface-variant": "#594238",
        "surface-container-low": "#f4f3f2",
        "outline": "#8c7166",
        "on-background": "#1a1c1c",
        "on-primary-container": "#fffbff",
        "on-primary-fixed-variant": "#7c2e00",
        "secondary": "#4e6073",
        "surface": "#faf9f8",
        "on-tertiary-fixed": "#001e31",
        "inverse-on-surface": "#f1f0f0",
        "secondary-fixed": "#d1e4fb",
        "surface-container": "#eeeeed",
        "inverse-surface": "#2f3130",
        "on-secondary-fixed-variant": "#36485b",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "primary-fixed": "#ffdbcd",
        "primary-fixed-dim": "#ffb595",
        "tertiary-fixed": "#cce5ff",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#351000",
        "on-primary": "#ffffff",
        "on-tertiary-fixed-variant": "#004b73",
        "inverse-primary": "#ffb595",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#fdfcff"
      },
      "fontFamily": {
        "headline": ["Plus Jakarta Sans"],
        "body": ["Manrope"],
        "label": ["Inter"]
      }
    }
  },
  plugins: []
};

export default config;

