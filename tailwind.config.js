const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/*
adds classes for controlling font width and optical size

width: .comp = compact, .cond = condensed
optical size: .micro = micro, .display = display

Details: https://www.monotype.com/fonts/helvetica-now-variable
*/
const fontVariationSettingsPlugin = plugin(function ({ addUtilities }) {
  const weights = [
    { name: "thin", value: 100 },
    { name: "extralight", value: 200 },
    { name: "light", value: 300 },
    { name: "normal", value: 400 },
    { name: "medium", value: 500 },
    { name: "semibold", value: 600 },
    { name: "bold", value: 700 },
    { name: "extrabold", value: 800 },
    { name: "black", value: 900 },
  ];

  const opszSettings = [
    { name: "text", value: 12 },
    { name: "display", value: 30 },
    { name: "micro", value: 4 },
  ];

  const utilities = {};

  weights.forEach(({ name, value }) => {
    opszSettings.forEach(({ name: opszName, value: opszValue }) => {
      utilities[`.font-${name}.${opszName}`] = {
        fontWeight: value,
        fontVariationSettings:
          `"wght" ${value}, "opsz" ${opszValue}, "wdth" 100`,
      };
      utilities[`.font-${name}.${opszName}.italic`] = {
        fontVariationSettings:
          `"slnt" 1, "wght" ${value}, "opsz" ${opszValue}, "wdth" 100`,
      };
      utilities[`.font-${name}.${opszName}.comp`] = {
        fontVariationSettings:
          `"wght" ${value}, "opsz" ${opszValue}, "wdth" 75`,
      };
      utilities[`.font-${name}.${opszName}.cond`] = {
        fontVariationSettings:
          `"wght" ${value}, "opsz" ${opszValue}, "wdth" 50`,
      };
    });

    utilities[`.font-${name}`] = {
      fontWeight: value,
      fontVariationSettings: `"wght" ${value}, "opsz" 12, "wdth" 100`,
    };
    utilities[`.font-${name}.italic`] = {
      fontVariationSettings: `"slnt" 1, "wght" ${value}, "opsz" 12, "wdth" 100`,
    };
    utilities[`.font-${name}.comp`] = {
      fontVariationSettings: `"wght" ${value}, "opsz" 12, "wdth" 75`,
    };
    utilities[`.font-${name}.cond`] = {
      fontVariationSettings: `"wght" ${value}, "opsz" 12, "wdth" 50`,
    };
  });

  utilities[".italic"] = {
    fontStyle: "italic",
    fontVariationSettings: '"slnt" 1, "opsz" 12, "wdth" 100',
  };
  utilities[".comp"] = {
    fontVariationSettings: '"wdth" 75',
  };
  utilities[".cond"] = {
    fontVariationSettings: '"wdth" 50',
  };

  addUtilities(utilities);
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.hbs", "./**/*.hbs"],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: "transparent",
      // Hygge: warm off-white instead of pure white
      white: "#FAF9F7",
      // Hygge: warm charcoal instead of pure black  
      black: "#1C1917",
      // Muted hygge accent colors
      yellow: "#D4A84B",      // soft gold
      blue: "#5B7B8A",        // warm blue
      vividBlue: "#4A6B7C",   // muted blue
      red: "#C4746E",         // terracotta red
      green: "#4A5D4A",       // forest green
      brown: "#8B7355",       // warm brown
      // Warm stone-based gray palette (hygge)
      gray: {
        "050": "#FAFAF9",     // warm off-white
        "075": "#F5F5F4",     // cream
        100: "#E7E5E4",       // light stone
        200: "#D6D3D1",       // stone 200
        300: "#A8A29E",       // stone 300
        400: "#78716C",       // stone 400
        500: "#57534E",       // stone 500
        600: "#44403C",       // stone 600
        700: "#363230",       // warm dark
        800: "#292524",       // stone 800
        850: "#231F1E",       // warm charcoal
        900: "#1C1917",       // stone 900
        925: "#171412",       // deep warm
        950: "#0F0D0C",       // near black warm
        975: "#0A0908",       // deepest warm
      },
    },
    extend: {
      fontFamily: {
        // Hygge font: Untitled Sans from Klim Type Foundry
        // Install the font files and update the name if using a different font
        // Alternatives: "Nationale" (Playtype), "FF Meta", "Lyon Text"
        sans: [
          '"Untitled Sans"',
          '"Helvetica Neue"',
          "Helvetica",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          '"Berkeley Mono"',
          '"TX-02-Data"',
          '"Roboto Mono"',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
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
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.100"),
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
    fontVariationSettingsPlugin,
  ],
};
