/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary-container": "#18181b",
        "surface-container-low": "#18181b",
        "on-primary-container": "#a1a1aa",
        "on-surface-variant": "#a1a1aa",
        "surface-container": "#18181b",
        "outline": "#27272a",
        "secondary": "#38bdf8",
        "error": "#f87171",
        "on-error": "#450a0a",
        "tertiary": "#4edea3",
        "on-background": "#fafafa",
        "surface-variant": "#27272a",
        "surface-container-high": "#27272a",
        "error-container": "#7f1d1d",
        "background": "#09090b",
        "surface-container-highest": "#27272a",
        "surface-container-lowest": "#000000",
        "outline-variant": "#27272a",
        "on-surface": "#fafafa",
        "surface": "#09090b",
      },

      "spacing": {
        "stack-sm": "8px",
        "unit": "4px",
        "stack-md": "16px",
        "gutter": "24px",
        "container-margin": "32px",
        "card-padding": "24px",
        "stack-lg": "32px",
        "stack-xl": "48px",
        "stack-2xl": "64px"
      },
      "fontFamily": {
        "sans": ["Inter", "sans-serif"],
        "display-lg": ["Geist", "sans-serif"],
        "headline-md-mobile": ["Geist", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "data-mono-lg": ["JetBrains Mono", "monospace"],
        "headline-md": ["Geist", "sans-serif"],
        "data-mono-sm": ["JetBrains Mono", "monospace"],
        "headline-sm": ["Geist", "sans-serif"],
        "body-md": ["Inter", "sans-serif"]
      },
      "fontSize": {
        "display-lg": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.04em", "fontWeight": "600"}],
        "headline-md-mobile": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.015em", "fontWeight": "500"}],
        "body-sm": ["13px", {"lineHeight": "20px", "fontWeight": "400"}],
        "data-mono-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "400"}],
        "headline-md": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "500"}],
        "data-mono-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.04em", "fontWeight": "500"}],
        "headline-sm": ["15px", {"lineHeight": "22px", "letterSpacing": "-0.01em", "fontWeight": "500"}],
        "body-md": ["15px", {"lineHeight": "24px", "fontWeight": "400"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
