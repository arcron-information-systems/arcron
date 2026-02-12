/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "!./app/proposals/**/*",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Keep existing CSS behavior stable; enable later if desired.
    preflight: false,
  },
  plugins: [],
};

