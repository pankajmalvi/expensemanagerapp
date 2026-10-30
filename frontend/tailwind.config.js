/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'neobrutal-sm': '2px 2px 0px 0px #000',
        'neobrutal': '4px 4px 0px 0px #000',
        'neobrutal-lg': '6px 6px 0px 0px #000',
        'neobrutal-xl': '8px 8px 0px 0px #000',
      },
      colors: {
        neo: {
          bg: '#FAF9F6',
          yellow: '#FEF08A',
          lime: '#BBF7D0',
          pink: '#FECDD3',
          blue: '#BAE6FD',
          purple: '#E9D5FF',
          orange: '#FED7AA',
          border: '#000000',
        }
      }
    },
  },
  plugins: [],
}
