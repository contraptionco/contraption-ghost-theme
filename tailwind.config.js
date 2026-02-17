const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.hbs", "./**/*.hbs"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#0A0A0A",
      yellow: "#fee53f",
      blue: "#54759e",
      vividBlue: "#0056ac",
      red: {
        DEFAULT: "#C43E2A",
        light: "#D4573F",
        dark: "#9A3020",
      },
      forest: {
        DEFAULT: "#2B4A3E",
        light: "#3D6B5A",
        dark: "#1E3630",
      },
      indigo: {
        DEFAULT: "#2C3E6B",
        light: "#3F5A94",
        dark: "#1E2A4A",
      },
      walnut: {
        DEFAULT: "#6B4D3A",
        light: "#8B6B52",
        dark: "#4A3628",
      },
      brass: "#B8956A",
      offwhite: {
        DEFAULT: "#F5F3F0",
        light: "#FAF9F7",
        dark: "#EDEBE7",
        warm: "#F6F4F1",
        cool: "#F5F6FA",
      },
      gray: {
        "050": "#F7F6F4",
        "075": "#ECEAE6",
        100: "#E0DDD8",
        200: "#CFCBC4",
        300: "#B1ADA6",
        400: "#9E9A93",
        500: "#7E7A73",
        600: "#625E58",
        700: "#514D48",
        800: "#3B3834",
        850: "#2F2C28",
        900: "#222120",
        925: "#1A1918",
        950: "#111110",
        975: "#090908",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          '"Soehne"',
          '"Helvetica Neue"',
          "Helvetica",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          '"Tiempos Text"',
          "Georgia",
          ...defaultTheme.fontFamily.serif,
        ],
        mono: [
          '"Soehne Mono"',
          '"Roboto Mono"',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            fontFamily: '"Tiempos Text", Georgia, serif',
            'ol[type="A"]': false,
            'ol[type="a"]': false,
            'ol[type="A" s]': false,
            'ol[type="a" s]': false,
            'ol[type="I"]': false,
            'ol[type="i"]': false,
            'ol[type="I" s]': false,
            'ol[type="i" s]': false,
            'ol[type="1"]': false,
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            h1: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
              letterSpacing: "-0.02em",
            },
            h2: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
              letterSpacing: "-0.02em",
            },
            h3: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
              letterSpacing: "-0.02em",
            },
            h4: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
              letterSpacing: "-0.02em",
            },
            h5: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
            },
            h6: {
              fontFamily: '"Soehne", "Helvetica Neue", Helvetica, sans-serif',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-flip"),
    require("@tailwindcss/line-clamp"),
  ],
};
