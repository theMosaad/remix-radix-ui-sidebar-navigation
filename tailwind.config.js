const defaultTheme = require("tailwindcss/defaultTheme");
const { indigo, slate, red } = require("@radix-ui/colors");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme(`spacing`),
      }),
      minWidth: (theme) => ({
        ...theme(`spacing`),
      }),
    },
    animation: {
      "accordion-open":
        "100ms ease-out 1 normal forwards running accordion-open",
      "accordion-close":
        "75ms ease-in 1 normal forwards running accordion-close",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      primary: {
        1: indigo.indigo1,
        2: indigo.indigo2,
        3: indigo.indigo3,
        4: indigo.indigo4,
        5: indigo.indigo5,
        6: indigo.indigo6,
        7: indigo.indigo7,
        8: indigo.indigo8,
        9: indigo.indigo9,
        10: indigo.indigo10,
        11: indigo.indigo11,
        12: indigo.indigo12,
      },

      gray: {
        1: slate.slate1,
        2: slate.slate2,
        3: slate.slate3,
        4: slate.slate4,
        5: slate.slate5,
        6: slate.slate6,
        7: slate.slate7,
        8: slate.slate8,
        9: slate.slate9,
        10: slate.slate10,
        11: slate.slate11,
        12: slate.slate12,
      },

      red: {
        1: red.red1,
        2: red.red2,
        3: red.red3,
        4: red.red4,
        5: red.red5,
        6: red.red6,
        7: red.red7,
        8: red.red8,
        9: red.red9,
        10: red.red10,
        11: red.red11,
        12: red.red12,
      },
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
    keyframes: {
      "accordion-open": {
        "0%": {
          height: 0,
          opacity: 0,
          transform: "translateY(-5px)",
          overflow: "hidden",
        },
        "100%": {
          height: "var(--radix-accordion-content-height)",
          opacity: 1,
          transform: "translateY(0)",
          overflow: "hidden",
        },
      },
      "accordion-close": {
        "0%": {
          height: "var(--radix-accordion-content-height)",
          opacity: 1,
          transform: "translateY(0)",
          overflow: "hidden",
        },
        "100%": {
          height: 0,
          opacity: 0,
          transform: "translateY(-5px)",
          overflow: "hidden",
        },
      },
    },
  },
  plugins: [],
};
