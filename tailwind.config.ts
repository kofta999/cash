import type { Config } from "daisyui";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // You can keep any custom extensions you need here
    },
  },
  daisyui: {
    themes: [],
    darkTheme: "business",
  } satisfies Config,

  plugins: [require("daisyui")],
};

export default config;
